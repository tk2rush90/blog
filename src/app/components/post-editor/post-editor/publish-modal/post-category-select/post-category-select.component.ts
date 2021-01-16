import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {environment} from '../../../../../../environments/environment';
import {OptionModel} from '@scripter/utils/type.util';

const {
  categories,
} = environment;

@Component({
  selector: 'app-post-category-select',
  templateUrl: './post-category-select.component.html',
  styleUrls: ['./post-category-select.component.scss']
})
export class PostCategorySelectComponent extends FormControlBaseDirective<string> implements OnInit {
  // category value
  value = '';
  // create option models with categories
  options: OptionModel<string>[] = [...categories];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value new value
   */
  writeValue(value: string | undefined): void {
    this.value = value || '';
  }
}
