import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {BOTH, LEFT, RIGHT, ViewToggleType} from '@scripter/components/common/view-toggle-icon/view-toggle-icon.component';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-editor-view-toggle',
  templateUrl: './editor-view-toggle.component.html',
  styleUrls: ['./editor-view-toggle.component.scss']
})
export class EditorViewToggleComponent extends FormControlBaseDirective<ViewToggleType> implements OnInit {
  // value
  value: ViewToggleType | undefined;
  // status constants
  readonly both: ViewToggleType = BOTH;
  readonly left: ViewToggleType = LEFT;
  readonly right: ViewToggleType = RIGHT;
  // icon types
  iconTypes: ViewToggleType[] = [this.both, this.left, this.right];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._defaultValue = BOTH;
  }

  /**
   * override `writeValue()` method
   * @param value value to write
   */
  writeValue(value: ViewToggleType | undefined): void {
    this.value = value;
  }
}
