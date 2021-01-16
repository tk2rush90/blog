import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {PostListResponseModel} from '@scripter/models/post-list-response-model';
import {ScrollDetectorDirective} from '@scripter/components/common/scroll-detector/scroll-detector.directive';
import {finalize} from 'rxjs/operators';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostListPageComponent extends ScrollDetectorDirective implements OnInit {
  // posts
  posts: PostModel[] = [];
  // loading state
  loading = false;
  // post list response
  private _response: PostListResponseModel | undefined;
  // post category
  private _category: string | undefined;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private postApiService: PostApiService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
  ) {
    super(elementRef);
  }

  ngOnInit(): void {
    this._subscribeScrollEnd();
    this._subscribeRouteParams();
  }

  /**
   * subscribe route params to get post by category
   */
  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute.paramMap
      .subscribe(res => {
        this._category = res.get('category') || undefined;
        this._response = undefined;
        this.posts = [];
        this._getPostByCategory();
      });

    this.subscriptionService.store('_subscribeRouteParams', sub);
  }

  /**
   * get post by category
   * @param pageToken next page token
   */
  private _getPostByCategory(pageToken?: string): void {
    if (this._category) {
      const sub = this.postApiService
        .getPosts({
          category: this._category,
          status: 'live',
          pageToken,
        })
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            this._response = res;

            if (pageToken) {
              this.posts.push(...res.items);
            } else {
              this.posts = res.items || [];
            }
          },
        });

      this.subscriptionService.store('_getPostByCategory', sub);
      this.loading = true;
    }
  }

  /**
   * subscribe scroll end
   */
  private _subscribeScrollEnd(): void {
    const sub = this.scrollEnd
      .subscribe(() => {
        this._getNextPage();
      });

    this.subscriptionService.store('_subscribeScrollEnd', sub);
  }

  /**
   * get next page
   */
  private _getNextPage(): void {
    if (!this.loading && this._response?.nextPageToken) {
      this._getPostByCategory(this._response.nextPageToken);
    }
  }
}