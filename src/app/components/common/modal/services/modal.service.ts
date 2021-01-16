import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {ModalOutletComponent} from '@scripter/components/common/modal/components/modal-outlet/modal-outlet.component';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {ModalOptions, ModalRef} from '@scripter/components/common/modal/models/modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // registered outlets
  // `k` is id of each outlet
  private _outlets: {[k: string]: ModalOutletComponent} = {};
  // created modalRefs
  // `k` is id of each modalRef
  private _modalRefs: {[k: string]: ModalRef<any>} = {};

  constructor(
    private subscriptionService: SubscriptionService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  /**
   * register outlet to service
   * @param outlet outlet
   */
  registerOutlet(outlet: ModalOutletComponent): void {
    this._outlets[outlet.id] = outlet;
  }

  /**
   * open the component as modal
   * @param component component to open as modal
   * @param options modal options
   */
  open<T>(component: T, options: ModalOptions = {}): void {
    const modalRef = new ModalRef({
      component,
      resolver: this.componentFactoryResolver,
      subscriptionService: this.subscriptionService,
      modalOptions: options,
    });

    this._modalRefs[modalRef.modalGroupId] = modalRef;

    this._initializeModalRef(modalRef);
    this._subscribeModalClosed(modalRef);
  }

  /**
   * close specific modal
   * @param id modal group id to close
   * @param result modal result
   */
  close(id: string, result?: any): void {
    this._modalRefs[id]?.close(result);
  }

  /**
   * close the modals which should be closed on navigating
   */
  closeOnNavigating(): void {
    Object.keys(this._modalRefs).forEach(id => {
      if (this._modalRefs[id].shouldCloseOnNavigating) {
        this._modalRefs[id].close();
      }
    });
  }

  /**
   * initialize modalRef with component for all registered outlets
   * @param ref modalRef to initialize
   */
  private _initializeModalRef<T>(ref: ModalRef<T>): void {
    Object.keys(this._outlets).forEach(id => {
      const viewContainerRef = this._outlets[id].viewContainerRef;

      if (viewContainerRef) {
        ref.createModalGroupRef(viewContainerRef);
      }
    });
  }

  /**
   * subscribe modal closed emitter of modalRef
   * @param ref modalRef to subscribe
   */
  private _subscribeModalClosed<T>(ref: ModalRef<T>): void {
    const sub = ref.closed
      .subscribe(() => {
        this._deleteModalRef(ref);
        this._unSubscribeModalRefClosed(ref);
      });

    this.subscriptionService.store(`_subscribeModalClosed${ref.modalGroupId}`, sub);
  }

  /**
   * delete modalRef from the refs object
   * @param ref modalRef to delete
   */
  private _deleteModalRef<T>(ref: ModalRef<T>): void {
    if (this._modalRefs[ref.modalGroupId]) {
      delete this._modalRefs[ref.modalGroupId];
    }
  }

  /**
   * unsubscribe closed emitter of modalRef
   * @param ref modalRef to unsubscribe
   */
  private _unSubscribeModalRefClosed<T>(ref: ModalRef<T>): void {
    this.subscriptionService.unSubscribe(`_subscribeModalClosed${ref.modalGroupId}`);
  }
}
