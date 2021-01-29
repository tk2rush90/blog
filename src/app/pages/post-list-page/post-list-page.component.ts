import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {PostListResponseModel} from '@scripter/models/post-list-response-model';
import {ScrollDetectorDirective} from '@scripter/components/common/scroll-detector/scroll-detector.directive';
import {finalize} from 'rxjs/operators';
import {PostModel} from '@scripter/models/post-model';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {environment} from '../../../environments/environment';

const {
  categories,
} = environment;

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
  // set `true` when category is valid
  private _canSearch = false;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private router: Router,
    private toastService: ToastService,
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
   * return `true` when no post to display
   */
  get empty(): boolean {
    return this.posts.length === 0 && !this.loading;
  }

  /**
   * reset the result
   */
  private _resetResult(): void {
    this._response = undefined;
    this.posts = [];
  }

  /**
   * subscribe route params to get post by category
   */
  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute.paramMap
      .subscribe(res => {
        const category = res.get('category') || '';
        this._setCategory(category);

        if (this._canSearch) {
          this._resetResult();
          this._getPostByCategory();
        } else {
          this.router.navigate(['/post/list/all']);
        }
      });

    this.subscriptionService.store('_subscribeRouteParams', sub);
  }

  /**
   * set valid category
   * @param category category
   */
  private _setCategory(category: string): void {
    if (category === 'all') {
      this._category = undefined;
      this._canSearch = true;
    } else if (categories.find(item => item.value === category)) {
      this._category = category as string;
      this._canSearch = true;
    } else {
      this._canSearch = false;
    }
  }

  /**
   * get post by category
   * @param pageToken next page token
   */
  private _getPostByCategory(pageToken?: string): void {
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
        error: err => {
          this.toastService.open({
            message: '포스트 목록을 가져오지 못했습니다',
            type: ToastType.error,
          });
        },
      });

    this.subscriptionService.store('_getPostByCategory', sub);
    this.loading = true;
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
