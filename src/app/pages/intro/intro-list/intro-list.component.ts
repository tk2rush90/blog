import {Component, ElementRef, OnInit} from '@angular/core';
import {IntroApiService} from '@scripter/services/api/intro-api.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {finalize} from 'rxjs/operators';
import {IntroModel} from '@scripter/models/intro-model';

@Component({
  selector: 'app-intro-list',
  templateUrl: './intro-list.component.html',
  styleUrls: ['./intro-list.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class IntroListComponent implements OnInit {
  // loading state
  loading = false;
  // intro list
  introList: IntroModel[] = [];

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private introApiService: IntroApiService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._getIntroList();
  }

  /**
   * get intro list
   */
  private _getIntroList(): void {
    this.loading = true;

    const sub = this.introApiService
      .getIntroList()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.introList = res;
      });

    this.subscriptionService.store('_getIntroList', sub);
  }
}
