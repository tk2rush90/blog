import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import * as PIXI from 'pixi.js';
import {easeOutElastic, easeOutQuad, easeOutQuart, linear} from '@scripter/utils/animation.util';
import {circleContainsPoint, getAngleOfLine, getPointOnArc} from '@scripter/utils/math.util';
import {spliceArrayItem} from '@scripter/utils/array.util';
import {randomNumber} from '@scripter/utils/random.util';
import {AbstractAnimationScene, AnimationService} from '@scripter/services/animation/animation.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {environment} from '../../../../environments/environment';
import {IntroBaseComponent} from '@scripter/components/intro/intro-base/intro-base.component';

const {
  urlPrefix,
} = environment;

export const SNOW_GROUND_HEIGHTS = 50;

export interface SizeOptions {
  // view size
  width: number;
  height: number;
}

export interface ShadowSpriteOption {
  texture: PIXI.Texture;
}

export enum ShadowSpriteStatus {
  hidden = 'hidden',
  visible = 'visible',
  shakable = 'shakable',
  shaking = 'shaking',
}

export enum ShadowSpriteDirection {
  left = 0,
  right = 1,
}

export class ShadowSprite extends AbstractAnimationScene {
  // pixi sprite
  sprite: PIXI.Sprite;
  // shadow sprite status
  private _status: ShadowSpriteStatus = ShadowSpriteStatus.hidden;
  // target heights to show up
  private _targetHeights = 0;
  // sprite position without applying sprite heights
  private _position: PIXI.Point = new PIXI.Point();
  // center position of sprite
  private _center: PIXI.Point = new PIXI.Point();
  // ripple to shake this object
  private _ripple: Ripple | undefined;
  // shaking step number
  // 0 to 10
  private _shakingStep = 0;
  // shaking direction
  private _shakingDirection: ShadowSpriteDirection = ShadowSpriteDirection.left;
  // shaking object from left
  private _shakingPowerLeft = [
    -.3,
    .3,
    -.25,
    .25,
    -.2,
    .2,
    -.15,
    .15,
    -.1,
    0,
  ];
  // shaking object from right
  private _shakingPowerRight = [
    .3,
    -.3,
    .25,
    -.25,
    .2,
    -.2,
    .15,
    -.15,
    .1,
    0,
  ];
  // shaking step speed in frame
  private readonly _shakingStepSpeed = 10;
  // show up minimum speed and maximum speed
  private readonly _minSpeed = 100;
  private readonly _maxSpeed = 300;
  // show up speed will be randomly set between min speed and max speed
  private readonly _showUpSpeed = randomNumber(this._minSpeed, this._maxSpeed);

  constructor(options: ShadowSpriteOption) {
    super();

    this.sprite = new PIXI.Sprite(options.texture);
    this.sprite.anchor.set(.5, 1);
    this.sprite.alpha = 0;
    // set target heights as sprite heights
    this._targetHeights = this.sprite.height;

    this.sprite.height = 0;
  }

  /**
   * update `_targetHeights`
   * @param heights heights
   */
  set targetHeights(heights: number) {
    this._targetHeights = heights;
  }

  /**
   * return the `_targetHeights`
   */
  get targetHeights(): number {
    return this._targetHeights;
  }

  /**
   * return `true` when object is shakable
   */
  get isShakable(): boolean {
    return this._status === ShadowSpriteStatus.shakable;
  }

  /**
   * return `true` when object is shaking
   */
  get isShaking(): boolean {
    return this._status === ShadowSpriteStatus.shaking;
  }

  /**
   * return the center point
   */
  get center(): PIXI.Point {
    return this._center;
  }

  /**
   * return the shaking power according to direction
   */
  get shakingPower(): number[] {
    switch (this._shakingDirection) {
      case ShadowSpriteDirection.left: {
        return this._shakingPowerLeft;
      }

      case ShadowSpriteDirection.right: {
        return this._shakingPowerRight;
      }
    }
  }

  /**
   * set the sprite base position
   * @param x x position
   * @param y y position
   */
  setPosition(x: number, y: number): void {
    this._position.set(x, y);
    this._updateSpritePosition();
    this._setCenterPoint();
  }

  /**
   * update the sprite position with base position
   */
  private _updateSpritePosition(): void {
    this.sprite.position.set(this._position.x, this._position.y);
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);

    switch (this._status) {
      case ShadowSpriteStatus.visible: {
        this._showUp();
        break;
      }

      case ShadowSpriteStatus.shaking: {
        this._shaking();
        break;
      }
    }
  }

  /**
   * show up the sprite
   */
  private _showUp(): void {
    this.sprite.height = easeOutElastic(this.time, 0, this._targetHeights, this._showUpSpeed);

    this._updateSpritePosition();

    if (this.time >= this._showUpSpeed) {
      this._setCenterPoint();
      this._status = ShadowSpriteStatus.shakable;
    }
  }

  /**
   * set center position of sprite
   */
  private _setCenterPoint(): void {
    const x = this._position.x;
    const y = this._position.y - this.sprite.height / 2;

    this._center.set(x, y);
  }

  /**
   * show up the sprite
   */
  show(): void {
    this._start = 0;
    this.sprite.alpha = 1;
    this._status = ShadowSpriteStatus.visible;
  }

  /**
   * shake object with ripple
   * @param ripple ripple to shake
   */
  shake(ripple: Ripple): void {
    if (this.isShakable || (this.isShaking && this._ripple !== ripple)) {
      this._shakingStep = 0;
      this._ripple = ripple;
      this._status = ShadowSpriteStatus.shaking;
      this._setShakingDirection();
    }
  }

  /**
   * shaking by ripple
   */
  private _shaking(): void {
    const target = this.shakingPower[this._shakingStep];
    const start = this.shakingPower[this._shakingStep - 1] || this.sprite.skew.x;
    const skew = linear(this.time, start, target - start, this._shakingStepSpeed);

    this.sprite.skew.set(skew, 0);

    if (this.time >= this._shakingStepSpeed) {
      if (this._shakingStep < (this.shakingPower.length - 1)) {
        this._start = 0;
        this._shakingStep++;
      } else {
        this._start = 0;
        this._shakingStep = 0;
        this._status = ShadowSpriteStatus.shakable;
      }
    }
  }

  /**
   * set shaking starting direction according to current skew value
   */
  private _setShakingDirection(): void {
    if (this.sprite.skew.x > 0) {
      this._shakingDirection = ShadowSpriteDirection.left;
    } else {
      this._shakingDirection = ShadowSpriteDirection.right;
    }
  }
}

export class ShadowsContainer extends AbstractAnimationScene {
  // loader
  private static _loader: PIXI.Loader = new PIXI.Loader(`${urlPrefix}/assets/intro/intro-2020-winter`);
  // emit when sprite created
  onSpriteCreated: EventEmitter<ShadowSprite> = new EventEmitter();
  // emit when all sprites loaded
  onLoadEnd: EventEmitter<void> = new EventEmitter();
  // house sprite
  house: ShadowSprite | undefined;
  // tree sprites
  trees: ShadowSprite[] = [];
  // mountain sprites
  mountains: ShadowSprite[] = [];
  // all shakable objects
  shakableObjects: ShadowSprite[] = [];
  // view size
  private _width = 0;
  private _height = 0;
  // house x position
  private _housePosition = 0;
  // snow ground y position
  private _groundY = 0;
  // house position rate by view width
  private readonly _housePositionRate = .67;
  // right mountain position rate by view width
  private readonly _mountainPositionRate = .19;
  // mountain position distance from second to first
  private readonly _bigMountainPositionDistance = -279;
  // mountain position distance between house and second
  private readonly _smallMountainPositionDistance = -270;
  // the number of trees to display
  private readonly _numberOfTrees = 12;
  // size rate of medium tree
  private readonly _mediumTreeSize = .87;
  // size rate of small tree
  private readonly _smallTreeSize = .68;
  // snow ground heights
  private readonly _snowGroundHeights = SNOW_GROUND_HEIGHTS;
  // tree position from the house
  private readonly _treePositions = [
    102,
    193,
    248,
    327,
    380,
    425,
    488,
    552,
    601,
    680,
    722,
    760,
  ];
  // waiting frame before showing shadows
  private readonly _waitingFrame = 270;

  constructor(options: SizeOptions) {
    super();

    this._width = options.width;
    this._height = options.height;
    this._calculateHousePosition();
    this._calculateGroundYPosition();
  }

  /**
   * return the loader
   */
  get loader(): PIXI.Loader {
    return ShadowsContainer._loader;
  }

  /**
   * return cached house texture
   */
  get houseTexture(): PIXI.Texture | undefined {
    return this.loader.resources.house?.texture;
  }

  /**
   * return cached tree texture
   */
  get treeTexture(): PIXI.Texture | undefined {
    return this.loader.resources.tree?.texture;
  }

  /**
   * return cached mountain texture
   */
  get mountainTexture(): PIXI.Texture | undefined {
    return this.loader.resources.mountain?.texture;
  }

  /**
   * return cached small mountain texture
   */
  get smallMountainTexture(): PIXI.Texture | undefined {
    return this.loader.resources.smallMountain?.texture;
  }

  /**
   * return `true` when all required assets loaded
   */
  get allAssetsLoaded(): boolean {
    return !!(this.houseTexture && this.treeTexture && this.mountainTexture);
  }

  /**
   * return small size trees
   */
  get smallTrees(): ShadowSprite[] {
    return [
      this.trees[1],
      this.trees[4],
      this.trees[7],
      this.trees[9],
    ];
  }

  /**
   * return medium size trees
   */
  get mediumTrees(): ShadowSprite[] {
    return [
      this.trees[2],
      this.trees[6],
      this.trees[11],
    ];
  }

  /**
   * calculate house position
   */
  private _calculateHousePosition(): void {
    this._housePosition = this._width * this._housePositionRate;
  }

  /**
   * calculate ground y position
   */
  private _calculateGroundYPosition(): void {
    this._groundY = this._height - this._snowGroundHeights;
  }

  /**
   * load image assets
   */
  loadAssets(): void {
    if (this.allAssetsLoaded) {
      this._onAssetsLoaded();
    } else {
      if (!this.houseTexture) {
        this.loader.add('house', 'house.svg');
      }

      if (!this.treeTexture) {
        this.loader.add('tree', 'tree.svg');
      }

      if (!this.mountainTexture) {
        this.loader.add('mountain', 'mountain.svg');
      }

      if (!this.smallMountainTexture) {
        this.loader.add('smallMountain', 'mountain2.svg');
      }

      this.loader.load(this._onAssetsLoaded);
    }
  }

  /**
   * handle loaded assets
   */
  private _onAssetsLoaded = (): void => {
    this._createHouse();
    this._createTrees();
    this._createMountain();
    this._createSmallMountain();
    this._setTreesSize();
    this._setSpritesPosition();
    this.onLoadEnd.emit();
  }

  /**
   * create house sprite
   */
  private _createHouse(): void {
    this.house = new ShadowSprite({
      texture: this.houseTexture as PIXI.Texture,
    });

    this.shakableObjects.push(this.house);
    this.onSpriteCreated.emit(this.house);
  }

  /**
   * create tree sprites
   */
  private _createTrees(): void {
    for (let i = 0; i < this._numberOfTrees; i++) {
      const tree = new ShadowSprite({
        texture: this.treeTexture as PIXI.Texture,
      });

      this.trees.push(tree);
      this.shakableObjects.push(tree);
      this.onSpriteCreated.emit(tree);
    }
  }

  /**
   * create big mountain texture
   */
  private _createMountain(): void {
    const mountain = new ShadowSprite({
      texture: this.mountainTexture as PIXI.Texture,
    });

    this.mountains.push(mountain);
    this.onSpriteCreated.emit(mountain);
  }

  /**
   * create small mountain texture
   */
  private _createSmallMountain(): void {
    const mountain = new ShadowSprite({
      texture: this.smallMountainTexture as PIXI.Texture,
    });

    this.mountains.push(mountain);
    this.onSpriteCreated.emit(mountain);
  }

  /**
   * set the size of trees
   */
  private _setTreesSize(): void {
    this.smallTrees.forEach(this._createSmallTree);
    this.mediumTrees.forEach(this._createMediumTree);
  }

  /**
   * create small tree
   * @param tree tree sprite
   */
  private _createSmallTree = (tree: ShadowSprite): void => {
    if (tree) {
      tree.sprite.width *= this._smallTreeSize;
      tree.targetHeights *= this._smallTreeSize;
    }
  }

  /**
   * create medium tree
   * @param tree tree sprite
   */
  private _createMediumTree = (tree: ShadowSprite): void => {
    if (tree) {
      tree.sprite.width *= this._mediumTreeSize;
      tree.targetHeights *= this._mediumTreeSize;
    }
  }

  /**
   * set position of sprites
   */
  private _setSpritesPosition(): void {
    this._setHousePosition();
    this._setTreesPosition();
    this._setMountainsPosition();
  }

  /**
   * set house sprite position
   */
  private _setHousePosition(): void {
    if (this.house) {
      const x = this._housePosition;

      this.house.setPosition(x, this._groundY);
    }
  }

  /**
   * set position of trees
   */
  private _setTreesPosition(): void {
    this.trees.forEach((tree, index) => {
      const x = this._housePosition + this._treePositions[index];

      tree.setPosition(x, this._groundY);
    });
  }

  /**
   * index `0` is big, `1` is small
   */
  private _setMountainsPosition(): void {
    const big = this.mountains[0];
    const small = this.mountains[1];

    // get the maximum x position for small mountain
    const x = Math.min(this._width * this._mountainPositionRate, this._housePosition + this._smallMountainPositionDistance);

    big.setPosition(x + this._bigMountainPositionDistance, this._groundY);
    small.setPosition(x, this._groundY);
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);
    this.wait();
  }

  /**
   * wait before showing up graphics
   */
  wait(): void {
    if (this.time >= this._waitingFrame) {
      // this.showUp();
    }
  }

  /**
   * show up sprites
   */
  showUp(): void {
    this.house?.show();
    this.trees.forEach(tree => tree.show());
    this.mountains.forEach(mountain => mountain.show());
    this.onDestroy.emit();
  }

  /**
   * set view size
   * @param width width
   * @param height height
   */
  setSize(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this._calculateHousePosition();
    this._calculateGroundYPosition();
    this._setSpritesPosition();
  }
}

export enum SnowGroundStatus {
  wait = 'wait',
  showing = 'showing',
}

/**
 * snow ground
 */
export class SnowGround extends AbstractAnimationScene {
  // emit when the ground showed up
  showedUp: EventEmitter<void> = new EventEmitter<void>();
  // ground graphics
  graphics: PIXI.Graphics = new PIXI.Graphics();
  // snow ground status
  private _status: SnowGroundStatus = SnowGroundStatus.wait;
  // view size
  private _width = 0;
  private _height = 0;
  // snow ground heights
  private _groundHeights: number;
  // initial ground heights before show up
  private readonly _initialGroundHeights = 0;
  // snow ground target heights
  private readonly _groundTargetHeights = SNOW_GROUND_HEIGHTS;
  // changes in heights
  private readonly _heightsChanges: number;
  // show up speed in frame
  private readonly _showUpSpeed = 30;
  // waiting frame before showing up
  private readonly _waitingFrame = 200;
  // ground color
  private readonly _color = 0xffffff;

  constructor(options: SizeOptions) {
    super();

    this._width = options.width;
    this._height = options.height;
    this._groundHeights = this._initialGroundHeights;
    this._heightsChanges = this._groundTargetHeights - this._initialGroundHeights;
  }

  /**
   * wait before showing up
   */
  wait(): void {
    if (this.time >= this._waitingFrame) {
      this._start = 0;
      this._status = SnowGroundStatus.showing;
    }
  }

  /**
   * show up the snow ground
   */
  showUp(): void {
    this._groundHeights = linear(this.time, this._initialGroundHeights, this._heightsChanges, this._showUpSpeed);
    this._draw();

    if (this.time >= this._showUpSpeed) {
      this.showedUp.emit();
      this.onDestroy.emit();
    }
  }

  /**
   * draw ground
   */
  private _draw(): void {
    const y = this._height - this._groundHeights;

    this.graphics.clear();
    this.graphics.beginFill(this._color);
    this.graphics.drawRect(0, y, this._width, this._groundHeights);
    this.graphics.endFill();
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);

    switch (this._status) {
      case SnowGroundStatus.showing: {
        this.showUp();
        break;
      }

      case SnowGroundStatus.wait: {
        this.wait();
        break;
      }
    }
  }

  /**
   * resize the ground
   * @param width view width
   * @param height view height
   */
  setSize(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this._draw();
  }
}

export interface RippleOptions {
  // view width
  width: number;
  // center positions
  x: number;
  y: number;
  // created snows
  snows: Snow[];
  // shadow sprite objects
  objects: ShadowSprite[];
}

/**
 * ripple to push snows
 */
export class Ripple extends AbstractAnimationScene {
  // ripple graphics
  graphics: PIXI.Graphics = new PIXI.Graphics();
  // ripple radius
  private _radius = 0;
  // ripple fill alpha
  private _alpha = 0;
  // total created snows
  private _snows: Snow[] = [];
  // shadow sprite objects
  private _objects: ShadowSprite[] = [];
  // initial fill alpha
  private readonly _initialAlpha = .5;
  // target fill alpha
  private readonly _targetAlpha = 0;
  // changing value for alpha
  private readonly _alphaChanges: number;
  // initial radius
  private readonly _initialRadius = 0;
  // target radius
  private readonly _targetRadius: number;
  // changing value for radius
  private readonly _radiusChanges: number;
  // ripple base color
  private readonly _color = 0xffffff;
  // ripple spreading speed in frame
  private readonly _spreadingSpeed: number;
  // ripple center position
  private readonly _position: PIXI.Point = new PIXI.Point();
  // minimum ripple target radius
  private readonly _minimumRadius = 120;
  // maximum ripple target radius
  private readonly _maximumRadius = 180;
  // base frame speed of spreading
  private readonly _baseSpeed = 40;

  constructor(options: RippleOptions) {
    super();

    this._targetRadius = Math.max(this._minimumRadius, Math.min(options.width * .2, this._maximumRadius));
    this._spreadingSpeed = this._targetRadius / this._minimumRadius * this._baseSpeed;
    this._snows = options.snows;
    this._objects = options.objects;
    this._alpha = this._initialAlpha;
    this._radius = this._initialRadius;
    this._position.set(options.x, options.y);

    this._alphaChanges = this._targetAlpha - this._initialAlpha;
    this._radiusChanges = this._targetRadius - this._initialRadius;
  }

  /**
   * return the ripple radius
   */
  get radius(): number {
    return this._radius;
  }

  /**
   * return the center position
   */
  get position(): PIXI.Point {
    return this._position;
  }

  /**
   * spreads the ripple
   */
  spreads(): void {
    this._radius = easeOutQuart(this.time, this._initialRadius, this._radiusChanges, this._spreadingSpeed);
    this._alpha = easeOutQuart(this.time, this._initialAlpha, this._alphaChanges, this._spreadingSpeed);
    this._draw();
    this._detectSnows();
    this._detectObjects();

    if (this.time >= this._spreadingSpeed) {
      this.onDestroy.emit();
    }
  }

  /**
   * draw ripple
   */
  private _draw(): void {
    const {x, y} = this._position;

    this.graphics.clear();
    this.graphics.beginFill(this._color, this._alpha);
    this.graphics.drawCircle(x, y, this._radius);
    this.graphics.endFill();
  }

  /**
   * detect snows to push away
   */
  private _detectSnows(): void {
    this._snows.forEach(snow => {
      if (this._isSnowContained(snow)) {
        snow.pushedByRipple(this);
      }
    });
  }

  /**
   * return `true` when snow contained in ripple
   * @param snow snow
   */
  private _isSnowContained(snow: Snow): boolean {
    const cx = this._position.x;
    const cy = this._position.y;
    const {x, y} = snow.position;

    return circleContainsPoint(cx, cy, this._radius, x, y);
  }

  /**
   * detect objects to shake
   */
  private _detectObjects(): void {
    this._objects.forEach(object => {
      if (this._isObjectContained(object)) {
        object.shake(this);
      }
    });
  }

  /**
   * return `true` when shadow object contained in ripple
   * @param object object
   */
  private _isObjectContained(object: ShadowSprite): boolean {
    const cx = this._position.x;
    const cy = this._position.y;
    const {x, y} = object.center;

    return circleContainsPoint(cx, cy, this._radius, x, y);
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);
    this.spreads();
  }

  /**
   * destroy ripple
   */
  destroy(): void {
    this.graphics.destroy();
  }
}

/**
 * animation type enum for snow
 */
export enum SnowAnimationType {
  falling = 'falling',
  pushed = 'pushed',
}

/**
 * snow object which draw snow
 */
export class Snow extends AbstractAnimationScene {
  // emit when ripple is pushing the snow
  onPushed: EventEmitter<Ripple> = new EventEmitter();
  // snow graphics
  graphics: PIXI.Graphics = new PIXI.Graphics();
  // snow animation type
  private _type: SnowAnimationType = SnowAnimationType.falling;
  // view width
  private _width = 0;
  // view height
  private _height = 0;
  // snow size
  private _size = 0;
  // x position to move
  private _dx = 0;
  // y position to move
  private _dy = 0;
  // ripple which is pushing the snow
  private _ripple: Ripple | undefined;
  // pushing angle between ripple center and snow center
  private _pushingAngle = 0;
  // default size of snow
  // the rendered snow size will be randomize by this value
  private readonly _defaultSize = 5;
  // the color of snow
  private readonly _color = 0xffffff;
  // the snow weight to set falling distance
  private readonly _weight = 50;
  // falling speed in frame
  private readonly _fallingSpeed = 140;
  // snow position
  private readonly _position: PIXI.Point = new PIXI.Point();
  // target xy position to animate
  private readonly _target: PIXI.Point = new PIXI.Point();
  // starting xy position before animating
  private readonly _starting: PIXI.Point = new PIXI.Point();

  constructor(options: SizeOptions) {
    super();

    this._width = options.width;
    this._height = options.height;

    this._initialize();
  }

  /**
   * return the snow position
   */
  get position(): PIXI.Point {
    return this._position;
  }

  /**
   * return `true` when snow is removable
   */
  get isRemovable(): boolean {
    return this._position.y >= this._height;
  }

  /**
   * initialize the snow
   */
  private _initialize(): void {
    this._setInitialPosition();
    this._setSnowSize();
  }

  /**
   * set initial position of snow before animate
   */
  private _setInitialPosition(): void {
    this._position.set(randomNumber(0, this._width), 0);
  }

  /**
   * set snow size
   */
  private _setSnowSize(): void {
    this._size = randomNumber(this._defaultSize * .3, this._defaultSize);
  }

  /**
   * draw snow
   */
  private _draw(): void {
    const {x, y} = this._position;

    this.graphics.clear();
    this.graphics.beginFill(this._color);
    this.graphics.drawCircle(x, y, this._size);
    this.graphics.endFill();
  }

  /**
   * set width and height for snow
   * @param width width
   * @param height height
   */
  setWidthHeight(width: number, height: number): void {
    this._width = width;
    this._height = height;
  }

  /**
   * falling down the snow
   */
  fallingDown(): void {
    if (!this.time) {
      this._setFallingTarget();
    }

    const x = linear(this.time, this._starting.x, this._dx, this._fallingSpeed);
    const y = linear(this.time, this._starting.y, this._dy, this._fallingSpeed);

    this._position.set(x, y);
    this._draw();

    if (this.isRemovable) {
      this.destroy();
      this.onDestroy.emit();
    } else if (this.time >= this._fallingSpeed) {
      this._start = 0;
    }
  }

  /**
   * start falling
   */
  startFalling(): void {
    this._type = SnowAnimationType.falling;
    this._ripple = undefined;
    this._start = 0;
  }

  /**
   * when snow is pushed by ripple
   * @param ripple ripple to push snow
   */
  pushedByRipple(ripple: Ripple): void {
    this._ripple = ripple;
    this._type = SnowAnimationType.pushed;
    this._start = 0;

    this._setPushingAngle();
    this.onPushed.emit(ripple);
  }

  /**
   * pushed away by ripple
   */
  pushedAway(): void {
    if (this._ripple) {
      const {x, y} = getPointOnArc(this._ripple.position, this._pushingAngle, this._ripple.radius);

      this._position.set(x, y);
      this._draw();
    }
  }

  /**
   * set pushing angle between snow center and ripple center
   */
  private _setPushingAngle(): void {
    if (this._ripple) {
      this._pushingAngle = getAngleOfLine(this._ripple.position, this._position);
    }
  }

  /**
   * set falling target
   */
  private _setFallingTarget(): void {
    const horizontalRange = this._width * .02;
    const x = randomNumber(this._position.x - horizontalRange, this._position.x + horizontalRange);
    const y = randomNumber(this._position.y + this._weight, this._position.y + this._weight * 1.5);

    this._target.set(x, y);
    this._starting.set(this._position.x, this._position.y);
    this._dx = this._target.x - this._starting.x;
    this._dy = this._target.y - this._starting.y;
  }

  /**
   * override `animate()` method to draw snow
   * @param frame frame
   */
  animate(frame: number): void {
    super.animate(frame);

    switch (this._type) {
      case SnowAnimationType.falling: {
        this.fallingDown();
        break;
      }

      case SnowAnimationType.pushed: {
        this.pushedAway();
        break;
      }
    }
  }

  /**
   * destroy the snow graphics
   */
  destroy(): void {
    this.graphics.destroy();
  }
}

export interface SnowContainerOptions extends SizeOptions {
  // shadow sprite objects
  objects: ShadowSprite[];
}

/**
 * snow container to create snows
 */
export class SnowContainer extends AbstractAnimationScene {
  // container
  container: PIXI.Container = new PIXI.Container();
  // emit after snow created
  snowCreated: EventEmitter<Snow> = new EventEmitter<Snow>();
  // emit after ripple created
  rippleCreated: EventEmitter<Ripple> = new EventEmitter<Ripple>();
  // pointer area
  private _pointerArea: PIXI.Graphics = new PIXI.Graphics();
  // view width
  private _width = 0;
  // view height
  private _height = 0;
  // created snows
  private _snows: Snow[] = [];
  // view rate is calculated by view width and `_baseRate`
  private _viewRate = 0;
  // snow create speed in frame
  private _createSpeed = 0;
  // shadow sprite objects
  private readonly _objects: ShadowSprite[] = [];
  // snow creating frame rate
  private readonly _creatingRate = 25;
  // base rate will divide view width to calculate `_viewRate`
  private readonly _baseRate = 76.8;

  constructor(options: SnowContainerOptions) {
    super();

    this._width = options.width;
    this._height = options.height;
    this._objects = options.objects;

    this._initialize();
  }

  /**
   * initialize the snow container
   */
  private _initialize(): void {
    this._initializePointerArea();
    this._drawPointerArea();
    this._addShockWaveCreationEvent();
    this._calculateCreateSpeed();
  }

  /**
   * calculate create speed
   */
  private _calculateCreateSpeed(): void {
    this._viewRate = this._width / this._baseRate;
    this._createSpeed = (this._creatingRate - this._viewRate) + this._creatingRate;
  }

  /**
   * initialize pointer area
   */
  private _initializePointerArea(): void {
    this._pointerArea.interactive = true;
    this.container.addChild(this._pointerArea);
  }

  /**
   * draw pointer area
   * fill the area with almost transparent rectangle
   * to make interactive
   */
  private _drawPointerArea(): void {
    this._pointerArea.clear();
    this._pointerArea.beginFill(0x0, .0000000000000001);
    this._pointerArea.drawRect(0, 0, this._width, this._height);
  }

  /**
   * add the container event to create ripple
   */
  private _addShockWaveCreationEvent(): void {
    this._pointerArea.addListener('pointerdown', this._createRipple);
  }

  /**
   * create ripple when pointerdown on container
   * @param event interaction event
   */
  private _createRipple = (event: PIXI.InteractionEvent): void => {
    const {x, y} = event.data.global;
    const ripple = new Ripple({
      x,
      y,
      width: this._width,
      snows: this._snows,
      objects: this._objects,
    });

    this._addRippleToContainer(ripple);
    this.rippleCreated.emit(ripple);
  }

  /**
   * add created ripple to container
   * @param ripple ripple to add
   */
  private _addRippleToContainer(ripple: Ripple): void {
    this.container.addChild(ripple.graphics);
  }

  /**
   * update container size
   * @param width width
   * @param height height
   */
  setSize(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this._updateSnowHeight();
    // re-draw pointer area
    this._drawPointerArea();
    this._calculateCreateSpeed();
  }

  private _updateSnowHeight(): void {
    this._snows.forEach(snow => snow.setWidthHeight(this._width, this._height));
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);
    if (this.time >= this._createSpeed) {
      this._createSnow();
      this._start = 0;
    }
  }

  /**
   * create snow
   */
  private _createSnow(): void {
    const snow = new Snow({
      width: this._width,
      height: this._height,
    });

    this._addSnowToContainer(snow);
    this.snowCreated.emit(snow);
    this._snows.push(snow);
  }

  /**
   * add snow graphics to container
   * @param snow created snow
   */
  private _addSnowToContainer(snow: Snow): void {
    this.container.addChild(snow.graphics);
  }

  /**
   * remove destroyed snow from the container
   * @param snow snow to remove
   */
  removeSnowFromContainer(snow: Snow): void {
    spliceArrayItem(this._snows, snow);
  }
}

/**
 * this class will animate background gradient
 */
export class BackgroundAnimator extends AbstractAnimationScene {
  // animation duration
  private _duration = 500;
  // gradient start hsl
  private readonly _startH = 198;
  private readonly _startS = 52;
  private readonly _startL = 9;
  // gradient target hsl
  private readonly _targetH = 231;
  private readonly _targetS = 54;
  private readonly _targetL = 28;
  // hsl values
  private _h = this._startH;
  private _s = this._startS;
  private _l = this._startL;
  // distance hsl value between target and start
  private _dh = this._targetH - this._startH;
  private _ds = this._targetS - this._startS;
  private _dl = this._targetL - this._startL;

  constructor() {
    super();
  }

  /**
   * return the hsl string of gradient start color
   */
  get startBackground(): string {
    return `hsl(${this._startH}, ${this._startS}%, ${this._startL}%)`;
  }

  /**
   * return the hsl string of gradient end color
   */
  get endBackground(): string {
    return `hsl(${this._h}, ${this._s}%, ${this._l}%)`;
  }

  /**
   * fade in
   */
  fadeIn(): void {
    this._h = easeOutQuad(this.time, this._startH, this._dh, this._duration);
    this._s = easeOutQuad(this.time, this._startS, this._ds, this._duration);
    this._l = easeOutQuad(this.time, this._startL, this._dl, this._duration);
  }

  /**
   * override `animate()` method
   * @param frame animation frame
   */
  animate(frame: number): void {
    super.animate(frame);

    this.fadeIn();

    if (this.time >= this._duration) {
      this.onDestroy.emit();
    }
  }
}

@Component({
  selector: 'app-intro-2020-winter',
  templateUrl: './intro-2020-winter.component.html',
  styleUrls: ['./intro-2020-winter.component.scss'],
  providers: [
    AnimationService,
    SubscriptionService,
  ]
})
export class Intro2020WinterComponent extends IntroBaseComponent implements OnInit, AfterViewInit {
  // url prefix
  readonly prefix = urlPrefix;
  // title
  readonly titleImage = `${this.prefix}/assets/images/scripter-title.png`;
  // background gradient animator
  private _background: BackgroundAnimator = new BackgroundAnimator();
  // snow container
  private _snowContainer!: SnowContainer;
  // snow ground
  private _snowGround!: SnowGround;
  // shadows container
  private _shadowsContainer!: ShadowsContainer;

  /**
   * bind animating background gradient
   */
  @HostBinding('style.background-image') get backgroundImage(): string {
    return `linear-gradient(180deg, ${this._background.startBackground}, ${this._background.endBackground})`;
  }

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef<HTMLElement>,
    protected animationService: AnimationService,
    private subscriptionService: SubscriptionService,
  ) {
    super(renderer, elementRef, animationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._createShadowsContainer();
  }

  /**
   * add background scene to animate
   */
  private _addBackgroundScene(): void {
    this.animationService.addScene(this._background);
  }

  /**
   * create snow container
   */
  private _createSnowContainer(): void {
    this._snowContainer = new SnowContainer({
      width: this._width,
      height: this._height,
      objects: this._shadowsContainer.shakableObjects,
    });

    this._addSnowContainerToStage();
    this._addSnowContainerScene();
    this._subscribeSnowCreated();
    this._subscribeRippleCreated();
  }

  /**
   * add snow container to stage to render
   */
  private _addSnowContainerToStage(): void {
    this._app.stage.addChild(this._snowContainer.container);
  }

  /**
   * add snow container scene to animation service
   */
  private _addSnowContainerScene(): void {
    this.animationService.addScene(this._snowContainer);
  }

  /**
   * subscribe `snowCreated` emitter of snow container to add snow to `AnimationService`
   */
  private _subscribeSnowCreated(): void {
    const sub = this._snowContainer.snowCreated
      .subscribe((snow: Snow) => {
        this.animationService.addScene(snow);
        this._subscribeSnowPushed(snow);
        this._subscribeSnowDestroy(snow);
      });

    this.subscriptionService.append('_subscribeSnowCreated', sub);
  }

  /**
   * subscribe `onPushed` and subscribe `onDestroy` from the ripple
   * @param snow pushed snow
   */
  private _subscribeSnowPushed(snow: Snow): void {
    const sub = snow.onPushed
      .subscribe((ripple: Ripple) => {
        this._subscribePushingRippleDestroy(ripple, snow);
      });

    this.subscriptionService.append('_subscribeSnowPushed', sub);
  }

  /**
   * subscribe `onDestroy` of pushing ripple to make snow falling after ripple destroyed
   * @param ripple ripple
   * @param snow snow
   */
  private _subscribePushingRippleDestroy(ripple: Ripple, snow: Snow): void {
    const sub = ripple.onDestroy
      .subscribe(() => {
        snow.startFalling();
      });

    this.subscriptionService.append('_subscribePushingRippleDestroy', sub);
  }

  /**
   * subscribe snow destroy to remove snow from the snow container
   * @param snow snow to subscribe
   */
  private _subscribeSnowDestroy(snow: Snow): void {
    const sub = snow.onDestroy
      .subscribe(() => {
        this._snowContainer.removeSnowFromContainer(snow);
      });

    this.subscriptionService.append('_subscribeSnowDestroy', sub);
  }

  /**
   * subscribe ripple created to add ripple to scene
   * and subscribe ripple destroy
   */
  private _subscribeRippleCreated(): void {
    const sub = this._snowContainer.rippleCreated
      .subscribe((ripple: Ripple) => {
        this.animationService.addScene(ripple);
        this._subscribeRippleDestroy(ripple);
      });

    this.subscriptionService.append('_subscribeRippleCreated', sub);
  }

  /**
   * subscribe ripple destroy
   * @param ripple ripple
   */
  private _subscribeRippleDestroy(ripple: Ripple): void {
    const sub = ripple.onDestroy
      .subscribe(() => {
        ripple.destroy();
      });

    this.subscriptionService.append('_subscribeRippleDestroy', sub);
  }

  /**
   * create snow ground
   */
  private _createSnowGround(): void {
    this._snowGround =  new SnowGround({
      width: this._width,
      height: this._height,
    });

    this._subscribeSnowGroundShowedUp();
    this._addSnowGroundToStage();
    this._addSnowGroundToScene();
  }

  /**
   * subscribe snow ground shows up state
   */
  private _subscribeSnowGroundShowedUp(): void {
    const sub = this._snowGround.showedUp
      .subscribe(() => {
        this._shadowsContainer?.showUp();
      });

    this.subscriptionService.store('_subscribeSnowGroundShowedUp', sub);
  }

  /**
   * add snow ground to stage to display
   */
  private _addSnowGroundToStage(): void {
    this._app.stage.addChild(this._snowGround.graphics);
  }

  /**
   * add snow ground to scene to animate
   */
  private _addSnowGroundToScene(): void {
    this.animationService.addScene(this._snowGround);
  }

  /**
   * create shadows container
   */
  private _createShadowsContainer(): void {
    this._shadowsContainer = new ShadowsContainer({
      width: this._width,
      height: this._height,
    });

    this._addShadowContainerToScene();
    this._subscribeOnSpriteCreated();
    this._subscribeOnLoadEnd();

    this._shadowsContainer.loadAssets();
  }

  /**
   * add shadow container to scene to animate
   */
  private _addShadowContainerToScene(): void {
    this.animationService.addScene(this._shadowsContainer);
  }

  /**
   * subscribe `onSpriteCreated` emitter of shadows container to add sprite to stage
   */
  private _subscribeOnSpriteCreated(): void {
    const sub = this._shadowsContainer.onSpriteCreated
      .subscribe((shadow: ShadowSprite) => {
        this._addShadowSpriteToStage(shadow);
        this._addShadowSpriteToScene(shadow);
      });

    this.subscriptionService.store('_subscribeOnSpriteCreated', sub);
  }

  /**
   * add shadow sprite to stage to display
   * @param shadow shadow sprite
   */
  private _addShadowSpriteToStage(shadow: ShadowSprite): void {
    this._app.stage.addChild(shadow.sprite);
  }

  /**
   * add shadow sprite to animation service to animate
   * @param shadow shadow sprite
   */
  private _addShadowSpriteToScene(shadow: ShadowSprite): void {
    this.animationService.addScene(shadow);
  }

  /**
   * subscribe `onLoadEnd` emitter of shadows container to add other graphics
   */
  private _subscribeOnLoadEnd(): void {
    const sub = this._shadowsContainer.onLoadEnd
      .subscribe(() => {
        this._addBackgroundScene();
        this._createSnowContainer();
        this._createSnowGround();
      });

    this.subscriptionService.store('_subscribeOnLoadEnd', sub);
  }

  /**
   * resize the application and container
   */
  protected _setSize(): void {
    super._setSize();
    this._updateApplicationSize();
    this._updateSnowContainerSize();
    this._updateSnowGroundSize();
    this._updateShadowsContainerSize();
  }

  /**
   * update application renderer size
   */
  private _updateApplicationSize(): void {
    this._app?.renderer?.resize(this._width, this._height);
  }

  /**
   * update snow container size
   */
  private _updateSnowContainerSize(): void {
    this._snowContainer?.setSize(this._width, this._height);
  }

  /**
   * update snow ground size
   */
  private _updateSnowGroundSize(): void {
    this._snowGround?.setSize(this._width, this._height);
  }

  /**
   * update shadows container size
   */
  private _updateShadowsContainerSize(): void {
    this._shadowsContainer?.setSize(this._width, this._height);
  }
}
