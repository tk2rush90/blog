import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ToastOutletComponent} from '@scripter/components/common/toast/components/toast-outlet/toast-outlet.component';
import {ToastMessageComponent} from '@scripter/components/common/toast/components/toast-message/toast-message.component';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

export enum ToastType {
  default = 'default',
  success = 'success',
  error = 'error',
}

export interface ToastOptions {
  // toast message
  message: string;
  // toast type
  type?: ToastType;
  // closing timer in milliseconds
  timer?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // registered outlets
  // `k` is id of toast outlet
  private _outlets: {[k: string]: ToastOutletComponent} = {};
  // created toast
  private _toast: ComponentRef<ToastMessageComponent> | undefined;

  constructor(
    private subscriptionService: SubscriptionService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  /**
   * register toast outlet
   * @param outlet outlet
   */
  registerOutlet(outlet: ToastOutletComponent): void {
    this._outlets[outlet.id] = outlet;
  }

  /**
   * open the toast message for all registered outlets
   * @param options toast options
   */
  open(options: ToastOptions): void {
    Object.keys(this._outlets).forEach(key => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ToastMessageComponent);

      if (this._outlets[key].viewContainerRef) {
        this._createToast(this._outlets[key].viewContainerRef as ViewContainerRef, factory, options);
      }
    });
  }

  /**
   * create toast for view container ref
   * @param viewContainerRef view container ref
   * @param factory toast message factory
   * @param options toast options
   */
  private _createToast(viewContainerRef: ViewContainerRef, factory: ComponentFactory<ToastMessageComponent>, options: ToastOptions): void {
    const toast = viewContainerRef.createComponent(factory);

    toast.instance.message = options.message;
    toast.instance.type = options.type || ToastType.default;
    toast.instance.count = options.timer || 5000;
    toast.changeDetectorRef.detectChanges();

    this._destroyExistingToast();

    this._toast = toast;
    this._subscribeCloseToast();
  }

  /**
   * subscribe close toast
   */
  private _subscribeCloseToast(): void {
    if (this._toast) {
      const sub = this._toast.instance.closeToast
        .subscribe(() => {
          this._destroyExistingToast();
        });

      this.subscriptionService.store(`_subscribeCloseToast${this._toast.instance.id}`, sub);
    }
  }

  /**
   * destroy existing toast message
   */
  private _destroyExistingToast(): void {
    if (this._toast) {
      this._toast.destroy();
      this.subscriptionService.unSubscribe(`_subscribeCloseToast${this._toast.instance.id}`);
    }
  }
}
