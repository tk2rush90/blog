import {ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[appInput], textarea[appInput]'
})
export class InputDirective extends FormControlBaseDirective<string> {
  // set type attribute
  @Input() @HostBinding('attr.type') type = 'text';
  // set spellcheck attribute
  @Input() @HostBinding('attr.spellcheck') spellcheck = false;
  // set autocomplete attribute
  @Input() @HostBinding('attr.autocomplete') autocomplete = 'off';
  // set placeholder attribute
  @Input() @HostBinding('attr.placeholder') placeholder = '';
  // bind base class to input
  @HostBinding('class.scripter-input-field') baseClass = true;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLInputElement>,
  ) {
    super(ngControl, changeDetectorRef);
  }

  /**
   * write value to input
   * @param value new value
   */
  writeValue(value: string | undefined): void {
    const el = this.elementRef?.nativeElement;

    if (el) {
      el.value = value || '';
    }
  }

  @HostListener('input')
  onHostInput(): void {
    const el = this.elementRef?.nativeElement;

    if (el) {
      this.setValue(el.value);
    }
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.markAsTouched();
  }
}
