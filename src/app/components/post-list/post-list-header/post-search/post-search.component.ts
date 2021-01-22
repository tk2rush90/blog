import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class PostSearchComponent implements OnInit {
  // search text
  search: FormControl = new FormControl('');
  // form group
  group: FormGroup = new FormGroup({
    search: this.search,
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeRouteQueries();
  }

  /**
   * subscribe route queries
   */
  private _subscribeRouteQueries(): void {
    const sub = this.activatedRoute
      .queryParamMap
      .subscribe(res => {
        this.search.patchValue(res.get('search') || '');
      });

    this.subscriptionService.store('_subscribeRouteQueries', sub);
  }

  /**
   * go to search result page with search string
   */
  onSubmit(): void {
    this.router.navigate(['/post/search/keyword'], {
      queryParams: {
        search: this.search.value || '',
      },
    });
  }
}
