import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '@scripter/components/common/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {ToastService} from '@scripter/components/common/toast/service/toast.service';

@Component({
  selector: 'app-html-code-copier',
  templateUrl: './html-code-copier.component.html',
  styleUrls: ['./html-code-copier.component.scss']
})
export class HtmlCodeCopierComponent extends FormControlBaseDirective<string> implements OnInit {
  // html code
  html = '';

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: string | undefined): void {
    this.html = value || '';
  }

  /**
   * copy html code
   * @param event event
   */
  copyHtmlCode(event: Event): void {
    const target = (event.target as HTMLTextAreaElement);

    target.select();

    document.execCommand('copy');

    this.toastService.open({ message: '복사 되었습니다' });
  }
}
