import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {randomKey} from '@scripter/utils/random.util';
import {ToastService} from '@scripter/components/common/toast/service/toast.service';

@Component({
  selector: 'app-toast-outlet',
  templateUrl: './toast-outlet.component.html',
  styleUrls: ['./toast-outlet.component.scss']
})
export class ToastOutletComponent implements OnInit {
  // view container ref
  @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | undefined;
  // random key
  id = randomKey();

  constructor(
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this._registerOutlet();
  }

  /**
   * register current outlet
   */
  private _registerOutlet(): void {
    this.toastService.registerOutlet(this);
  }
}
