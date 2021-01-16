import {Directive, HostBinding, Input} from '@angular/core';

export type StrokeButtonColor = 'grey';

@Directive({
  selector: '[appStrokeButton]'
})
export class StrokeButtonDirective {
  // set the color scheme for stroke button
  @Input() @HostBinding('attr.scripter-color') color: StrokeButtonColor = 'grey';
  // bind base class to stroke button
  @HostBinding('class.scripter-stroke-button') baseClass = true;

  constructor() { }

}
