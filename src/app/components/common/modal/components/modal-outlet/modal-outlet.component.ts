import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {randomKey} from '@scripter/utils/random.util';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {NavigationStart, Router} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ModalOutletComponent implements OnInit {
  // view container
  @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | undefined;
  // modal outlet id
  id = randomKey();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._registerOutlet();
    this._subscribeRouterEvents();
  }

  /**
   * register current outlet
   */
  private _registerOutlet(): void {
    this.modalService.registerOutlet(this);
  }

  /**
   * subscribe router events to close modal automatically
   */
  private _subscribeRouterEvents(): void {
    const sub = this.router.events
      .subscribe(res => {
        if (res instanceof NavigationStart) {
          this.modalService.closeOnNavigating();
        }
      });

    this.subscriptionService.store('_subscribeRouterEvents', sub);
  }
}
