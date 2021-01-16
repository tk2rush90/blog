import {AfterViewInit, Component, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {ToastType} from '@scripter/components/common/toast/service/toast.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {randomKey} from '@scripter/utils/random.util';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  animations: [
    trigger('toast', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0,
      })),
      state('toast', style({
        transform: 'scale(1)',
        opacity: 1,
      })),
      transition('void <=> toast', animate('.15s cubic-bezier(0,.99,.77,1)')),
    ])
  ]
})
export class ToastMessageComponent implements OnInit, AfterViewInit, OnDestroy {
  // emit to close toast
  @Output() closeToast: EventEmitter<void> = new EventEmitter<void>();
  // bind toast animation
  @HostBinding('@toast') toastAnimation = 'toast';
  // bind toast type
  @HostBinding('attr.scripter-type') type: ToastType | undefined;
  // random id
  id = randomKey();
  // toast message
  message: string | undefined;
  // toast timer count
  count = 0;
  // timeout timer
  private _timer: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._countDown();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * start counting down to close the toast
   */
  private _countDown(): void {
    this._timer = setTimeout(() => {
      this.closeToast.emit();
    }, this.count);
  }

  @HostListener('click')
  onHostClicked(): void {
    this.closeToast.emit();
  }
}
