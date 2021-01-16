import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-post-label-input',
  templateUrl: './post-label-input.component.html',
  styleUrls: ['./post-label-input.component.scss']
})
export class PostLabelInputComponent extends FormControlBaseDirective<string> implements OnInit {
  // labels
  labels: string[] = [];
  // input value
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
   * return the label string
   */
  get labelString(): string {
    return (this.labels || []).join(',');
  }

  /**
   * return `true` when input value is valid
   */
  get isValidValue(): boolean {
    return !!(this.value || '').trim();
  }

  /**
   * return `true` when value isn't duplicated
   */
  get isNotDuplicated(): boolean {
    return (this.labels || []).indexOf(this.value) === -1;
  }

  /**
   * write value to component
   * @param value new value
   */
  writeValue(value: string | undefined): void {
    this.labels = (value || '').split(',').filter(item => item);
  }

  /**
   * add new label
   */
  addNewLabel(): void {
    if (this.isValidValue && this.isNotDuplicated) {
      this.labels.push(this.value);
      this.value = '';
      this.setValue(this.labelString);
    }
  }

  /**
   * remove existing label
   * @param label label
   */
  removeExistingLabel(label: string): void {
    const index = (this.labels || []).indexOf(label);

    if (index !== -1) {
      this.labels.splice(index, 1);
      this.setValue(this.labelString);
    }
  }
}
