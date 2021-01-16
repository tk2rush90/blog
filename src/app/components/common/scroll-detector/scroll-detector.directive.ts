import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScrollDetector]'
})
export class ScrollDetectorDirective {
  // emit when scroll in end
  @Output() scrollEnd: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
  ) { }

  @HostListener('scroll')
  onHostScroll(): void {
    this._detectScrollEnd();
  }

  /**
   * detect scroll end and emit `scrollEnd`
   */
  private _detectScrollEnd(): void {
    const el = this.elementRef.nativeElement;

    if (el.scrollHeight <= (el.scrollTop + el.offsetHeight)) {
      this.scrollEnd.emit();
    }
  }
}
