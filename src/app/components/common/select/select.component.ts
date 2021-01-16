import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional, Self} from '@angular/core';
import {OptionModel} from '@scripter/utils/type.util';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T> extends FormControlBaseDirective<T> implements OnInit {
  // placeholder
  @Input() placeholder = 'Select...';

  /**
   * set options for select
   * @param options options
   */
  @Input() set options(options: OptionModel<T>[]) {
    this._options = options || [];
    this._setSelectedLabel();
  }
  // opened state
  opened = false;
  // selected label
  label = '';
  // selected value
  value: T | undefined;
  // options for select
  private _options: OptionModel<T>[] = [];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * return the options
   */
  get options(): OptionModel<T>[] {
    return this._options;
  }

  /**
   * open the options
   */
  open(): void {
    this.opened = true;
  }

  /**
   * close the options
   */
  close(): void {
    this.opened = false;
    this.markAsTouched();
  }

  /**
   * write value to component
   * @param value new value
   */
  writeValue(value: T | undefined): void {
    this.value = value;
    this._setSelectedLabel();
  }

  /**
   * set selected label with value
   */
  private _setSelectedLabel(): void {
    const option = this._options.find(item => item.value === this.value);

    if (option) {
      this.label = option.label;
    }
  }

  /**
   * update component value with option
   * @param option option
   */
  onOptionClicked(option: OptionModel<T>): void {
    this.setValue(option.value);
    this.opened = false;
  }
}
