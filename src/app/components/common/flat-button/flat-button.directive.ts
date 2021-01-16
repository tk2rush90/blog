import {Directive, HostBinding, Input} from '@angular/core';

export type FlatButtonColor = 'grey';

@Directive({
  selector: '[appFlatButton]'
})
export class FlatButtonDirective {
  // set color and bind to attribute
  @Input() @HostBinding('attr.scripter-color') color: FlatButtonColor = 'grey';
  // bind base class
  @HostBinding('class.scripter-flat-button') baseClass = true;

  constructor() { }

}
