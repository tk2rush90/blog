import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-post-title-input',
  templateUrl: './post-title-input.component.html',
  styleUrls: ['./post-title-input.component.scss']
})
export class PostTitleInputComponent extends FormControlBaseDirective<string> implements OnInit {
  // title value
  value = '';

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write title value to component
   * @param value new value
   */
  writeValue(value: string | undefined): void {
    this.value = value || '';
  }
}
