import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoScrollItem]'
})
export class AutoScrollItemDirective {
  // the focused state of item
  @Input() focused = false;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) { }
}
