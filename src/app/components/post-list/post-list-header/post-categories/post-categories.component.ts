import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {OptionModel} from '@scripter/utils/type.util';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

const {
  categories,
  urlPrefix,
} = environment;

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostCategoriesComponent implements OnInit {
  // categories
  categories: OptionModel<string>[] = [...categories];
  // url prefix
  readonly prefix = urlPrefix;
  // current category
  private _category: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeRouteParams();
  }

  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute
      .paramMap
      .subscribe(res => {
        this._category = res.get('category') || undefined;
      });

    this.subscriptionService.store('_subscribeRouteParams', sub);
  }

  isActive(param: string): boolean {
    return param === this._category;
  }
}
