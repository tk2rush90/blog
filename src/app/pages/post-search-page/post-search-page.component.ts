import {Component, ElementRef, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';
import {PostListResponseModel} from '@scripter/models/post-list-response-model';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {finalize} from 'rxjs/operators';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {ScrollDetectorDirective} from '@scripter/components/common/scroll-detector/scroll-detector.directive';
import {combineLatest} from 'rxjs';
import {environment} from '../../../environments/environment';

const {
  urlPrefix,
} = environment;

export enum SearchParamType {
  keyword = 'keyword',
  labels = 'labels',
}

@Component({
  selector: 'app-post-search-page',
  templateUrl: './post-search-page.component.html',
  styleUrls: [
    './post-search-page.component.scss',
    '../post-list-page/post-list-page.component.scss',
  ],
  providers: [
    SubscriptionService,
  ],
})
export class PostSearchPageComponent extends ScrollDetectorDirective implements OnInit {
  // posts
  posts: PostModel[] = [];
  // loading state
  loading = false;
  // labels to search
  labels = '';
  // prefix
  prefix = urlPrefix;
  // post list response
  private _response: PostListResponseModel | undefined;
  // search param type
  private _type: SearchParamType | undefined;
  // post search text
  private _search = '';

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private postApiService: PostApiService,
    private subscriptionService: SubscriptionService,
  ) {
    super(elementRef);
  }

  ngOnInit(): void {
    this._subscribeScrollEnd();
    this._subscribeRouteChanges();
  }

  /**
   * return `true` when no post to display
   */
  get empty(): boolean {
    return this.posts.length === 0 && !this.loading;
  }

  /**
   * subscribe route changes to get result
   */
  private _subscribeRouteChanges(): void {
    const sub = combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParamMap,
    ]).subscribe(res => {
      this._type = res[0]?.get('type') as SearchParamType || undefined;
      this._search = res[1]?.get('search') || '';
      this.labels = res[1]?.get('labels') || '';
      this.posts = [];
      this._response = undefined;
      this._searchOrGetPosts();
    });

    this.subscriptionService.store('_subscribeRouteChanges', sub);
  }

  /**
   * search or get posts
   * @param pageToken page token
   */
  private _searchOrGetPosts(pageToken?: string): void {
    switch (this._type) {
      case SearchParamType.keyword: {
        this._searchPosts(pageToken);
        break;
      }

      case SearchParamType.labels: {
        this._getPostsByLabels(pageToken);
        break;
      }
    }
  }

  /**
   * search posts with query string
   * @param pageToken next page token
   */
  private _searchPosts(pageToken?: string): void {
    if (this._search) {
      const sub = this.postApiService
        .searchPosts(this._search || '')
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            this._handlePostResponse(res, pageToken);
          },
          error: () => {
            this._showErrorMessage();
          },
        });

      this.subscriptionService.store('_searchPosts', sub);
      this.loading = true;
    } else {
      this._toHome();
    }
  }

  /**
   * get post by category
   * @param pageToken next page token
   */
  private _getPostsByLabels(pageToken?: string): void {
    if (this.labels) {
      const sub = this.postApiService
        .getPosts({
          category: this.labels,
          status: 'live',
          pageToken,
        })
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            this._handlePostResponse(res, pageToken);
          },
          error: () => {
            this._showErrorMessage();
          },
        });

      this.subscriptionService.store('_getPostsByLabels', sub);
      this.loading = true;
    } else {
      this._toHome();
    }
  }

  /**
   * navigate to home page
   */
  private _toHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * handle post response
   * @param res response
   * @param pageToken page token
   */
  private _handlePostResponse(res: PostListResponseModel, pageToken?: string): void {
    this._response = res;

    if (pageToken) {
      this.posts.push(...res.items);
    } else {
      this.posts = res.items || [];
    }
  }

  /**
   * show error message for post list
   * @private
   */
  private _showErrorMessage(): void {
    this.toastService.open({
      message: '포스트 목록을 가져오지 못했습니다',
      type: ToastType.error,
    });
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
      this._searchPosts(this._response.nextPageToken);
    }
  }
}
