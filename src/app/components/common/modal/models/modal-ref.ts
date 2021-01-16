import {ComponentFactoryResolver, ComponentRef, EventEmitter, Injector, Type, ViewContainerRef} from '@angular/core';
import {ModalGroupComponent} from '@scripter/components/common/modal/components/modal-group/modal-group.component';
import {ModalBackdropComponent} from '@scripter/components/common/modal/components/modal-backdrop/modal-backdrop.component';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {ModalWrapperComponent} from '@scripter/components/common/modal/components/modal-wrapper/modal-wrapper.component';

export const MODAL_DATA = 'MODAL_DATA';
export const MODAL_REF = 'MODAL_REF';

export interface ModalOptions {
  data?: any;
  closeOnNavigating?: boolean;
  onClose?(result: any): void;
}

export interface ModalRefOptions<T> {
  // modal component
  component: T;
  // component factory resolver
  resolver: ComponentFactoryResolver;
  // subscription service
  subscriptionService: SubscriptionService;
  // modal options
  modalOptions: ModalOptions;
}

export class ModalRef<T> {
  // closed emitter
  closed: EventEmitter<void> = new EventEmitter<void>();
  // component factory resolver
  private _resolver: ComponentFactoryResolver;
  // subscription service from modal service
  private _subscriptionService: SubscriptionService;
  // modal group
  private _modalGroupRef: ComponentRef<ModalGroupComponent> | undefined;
  // modal backdrop
  private _modalBackdropRef: ComponentRef<ModalBackdropComponent> | undefined;
  // modal wrapper
  private _modalWrapperRef: ComponentRef<ModalWrapperComponent> | undefined;
  // modal component
  private _modalComponentRef: ComponentRef<T> | undefined;
  // modal options
  private _modalOptions: ModalOptions;
  // modal component
  private readonly _component: T;

  constructor(options: ModalRefOptions<T>) {
    this._component = options.component;
    this._resolver = options.resolver;
    this._subscriptionService = options.subscriptionService;
    this._modalOptions = options.modalOptions;
  }

  /**
   * subscription key for modal group
   */
  get modalGroupId(): string {
    let key = '';

    if (this._modalGroupRef) {
      key = this._modalGroupRef.instance.id;
    }

    return key;
  }

  /**
   * should close the modal on navigating
   */
  get shouldCloseOnNavigating(): boolean {
    return this._modalOptions.closeOnNavigating || false;
  }

  /**
   * create modal group ref for component
   * @param viewContainerRef viewContainerRef of `ModalGroup`
   */
  createModalGroupRef(viewContainerRef: ViewContainerRef): void {
    const factory = this._resolver.resolveComponentFactory(ModalGroupComponent);

    this._modalGroupRef = viewContainerRef.createComponent(factory);
    this._modalGroupRef.changeDetectorRef.detectChanges();
    this._createGroupChildren();
  }

  /**
   * create children for modalGroup
   */
  private _createGroupChildren(): void {
    if (this._modalGroupRef?.instance.viewContainerRef) {
      const ref = this._modalGroupRef?.instance.viewContainerRef;
      this._createModalBackdrop(ref);
      this._createModalWrapper(ref);
    }
  }

  /**
   * create modal backdrop for group
   * @param viewContainerRef modalGroup viewContainerRef
   */
  private _createModalBackdrop(viewContainerRef: ViewContainerRef): void {
    if (this._modalGroupRef) {
      const factory = this._resolver.resolveComponentFactory(ModalBackdropComponent);

      this._modalBackdropRef = viewContainerRef.createComponent(factory);
      this._modalBackdropRef.changeDetectorRef.detectChanges();
      this._subscribeBackdropClick();
    }
  }

  /**
   * subscribe `backdropClick` emitter of backdrop
   */
  private _subscribeBackdropClick(): void {
    if (this._modalBackdropRef) {
      const sub = this._modalBackdropRef.instance.backdropClick
        .subscribe(() => {
          this.close();
        });

      this._subscriptionService.store(`_subscribeBackdropClick${this.modalGroupId}`, sub);
    }
  }

  /**
   * create modal wrapper for group
   * @param viewContainerRef modalGroup viewContainerRef
   */
  private _createModalWrapper(viewContainerRef: ViewContainerRef): void {
    if (this._modalGroupRef) {
      const factory = this._resolver.resolveComponentFactory(ModalWrapperComponent);

      this._modalWrapperRef = viewContainerRef.createComponent(factory);
      this._modalWrapperRef.changeDetectorRef.detectChanges();

      if (this._modalWrapperRef.instance.viewContainerRef) {
        this._createModalComponent(this._modalWrapperRef.instance.viewContainerRef);
      }
    }
  }

  /**
   * create modal component for group
   * @param viewContainerRef modalWrapper viewContainerRef
   */
  private _createModalComponent(viewContainerRef: ViewContainerRef): void {
    if (this._modalGroupRef) {
      const factory = this._resolver.resolveComponentFactory(this._component as unknown as Type<any>);
      const injector = this._createModalInjector();

      this._modalComponentRef = viewContainerRef.createComponent(factory, undefined, injector);
      this._modalComponentRef.changeDetectorRef.detectChanges();
    }
  }

  /**
   * create modal injector
   */
  private _createModalInjector(): Injector {
    return Injector.create({
      providers: [
        {
          provide: MODAL_DATA,
          useValue: this._modalOptions.data,
        },
        {
          provide: MODAL_REF,
          useValue: this,
        },
      ],
    });
  }

  /**
   * close current modal
   * @param result result data
   */
  close(result?: any): void {
    if (this._modalOptions.onClose) {
      this._modalOptions.onClose(result);
    }

    this._modalGroupRef?.destroy();
    this.closed.emit();

    this._unSubscribeBackdropClick();
  }

  /**
   * unsubscribe `backdropClick` emitter of backdrop
   */
  private _unSubscribeBackdropClick(): void {
    this._subscriptionService.unSubscribe(`_subscribeBackdropClick${this.modalGroupId}`);
  }
}
