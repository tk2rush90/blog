import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AnimationService} from '@scripter/services/animation/animation.service';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-intro-base',
  template: '',
})
export class IntroBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  // application
  protected _app!: PIXI.Application;
  // view width and height
  protected _width = 0;
  protected _height = 0;

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef<HTMLElement>,
    protected animationService: AnimationService,
  ) {
  }

  ngOnInit(): void {
    this.animationService.startAnimation();
  }

  ngAfterViewInit(): void {
    this._setSize();
    this._createPixiApplication();
    this._appendToView();
  }

  ngOnDestroy(): void {
    this._app?.destroy();
  }

  /**
   * set view container size
   */
  protected _setSize(): void {
    const {
      width,
      height,
    } = this.elementRef.nativeElement.getBoundingClientRect();

    this._width = width;
    this._height = height;
  }

  /**
   * create pixi application
   */
  protected _createPixiApplication(): void {
    this._app = new PIXI.Application({
      width: this._width,
      height: this._height,
      antialias: true,
      transparent: true,
    });
  }

  /**
   * append pixi application to view
   */
  protected _appendToView(): void {
    this.renderer.appendChild(this.elementRef.nativeElement, this._app.view);
  }

  /**
   * resize the application and container
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._setSize();
  }
}
