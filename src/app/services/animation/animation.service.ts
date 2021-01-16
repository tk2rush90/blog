import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {randomKey} from '@scripter/utils/random.util';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

export interface AnimationScene {
  // destroy emitter
  onDestroy: EventEmitter<void>;

  /**
   * animate with frame
   * @param frame frame
   */
  animate(frame: number): void;
}

export abstract class AbstractAnimationScene implements AnimationScene {
  onDestroy: EventEmitter<void> = new EventEmitter<void>();
  // start time
  protected _start = 0;
  // animation frame
  protected _frame = 0;

  /**
   * get animation during time
   */
  get time(): number {
    return this._frame - this._start;
  }

  /**
   * should be overridden
   * @param frame animation frame
   */
  animate(frame: number): void {
    this._frame = frame;
    this._start = this._start || this._frame;
  }
}

@Injectable()
export class AnimationService implements OnDestroy {
  // animation frame
  private _frame = 0;
  // scenes to animate
  private _scenes: AnimationScene[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.subscriptionService.unSubscribeAll();
  }

  /**
   * start animation
   */
  startAnimation(): void {
    this._frame = requestAnimationFrame(this._animate);
  }

  /**
   * stop animation
   */
  stopAnimation(): void {
    cancelAnimationFrame(this._frame);
  }

  /**
   * add scene to animation service
   * the scene will be removed automatically after it destroyed
   * @param scene animation scene
   */
  addScene(scene: AnimationScene): void {
    this._scenes.push(scene);
    this._subscribeSceneDestroy(scene);
  }

  /**
   * subscribe scene destroy
   * @param scene scene to subscribe
   */
  private _subscribeSceneDestroy(scene: AnimationScene): void {
    const key = randomKey();
    const sub = scene.onDestroy.subscribe(() => {
      this._scenes = this._scenes.filter(item => item !== scene);
      this.subscriptionService.unSubscribe(`_subscribeSceneDestroy ${key}`);
    });

    this.subscriptionService.store(`_subscribeSceneDestroy ${key}`, sub);
  }

  /**
   * animate animations
   */
  private _animate = (): void => {
    this._scenes.forEach(scene => scene.animate(this._frame));
    this._frame = requestAnimationFrame(this._animate);
  }
}
