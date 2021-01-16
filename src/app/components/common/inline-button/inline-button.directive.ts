import {Directive, HostBinding, Input} from '@angular/core';

export type InlineButtonColor = 'grey' | 'semi-white' | 'black';

@Directive({
  selector: '[appInlineButton]'
})
export class InlineButtonDirective {
  // set color and bind to attribute
  @Input() @HostBinding('attr.scripter-color') color: InlineButtonColor = 'grey';
  // bind base class
  @HostBinding('class.scripter-inline-button') baseClass = true;

  constructor() { }

}
