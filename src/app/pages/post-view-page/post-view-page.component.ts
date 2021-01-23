import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostModel} from '@scripter/models/post-model';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {finalize} from 'rxjs/operators';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {getPostErrorMessage} from '@scripter/utils/post-error.util';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-post-view-page',
  templateUrl: './post-view-page.component.html',
  styleUrls: ['./post-view-page.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class PostViewPageComponent implements OnInit {
  // post model
  post: PostModel | undefined;
  // loading state
  loading = false;
  // post id
  private _id: string | undefined;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private toastService: ToastService,
    private postApiService: PostApiService,
    private activatedRoute: ActivatedRoute,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeRouteParams();
  }

  /**
   * subscribe route params to get post by category
   */
  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute.paramMap
      .subscribe(res => {
        this._id = res.get('id') || undefined;
        this.post = undefined;
        this._getPostById();
      });

    this.subscriptionService.store('_subscribeRouteParams', sub);
  }

  /**
   * get post by id
   */
  private _getPostById(): void {
    if (this._id && !this.loading) {
      const sub = this.postApiService
        .getPost(this._id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            this.post = res;
            this._updateMetaAndTitle();
          },
          error: err => {
            this.toastService.open({
              message: getPostErrorMessage(err),
              type: ToastType.error,
            });

            this._toMain();
          }
        });

      this.subscriptionService.store('_getPostById', sub);
      this.loading = true;
    }
  }

  /**
   * update meta tags and title string
   */
  private _updateMetaAndTitle(): void {
    if (this.post) {
      const tags = this.post.labels.join(', ');

      this.title.setTitle(this.post.title);
      this.meta.updateTag({
        name: 'keywords',
        content: tags,
      });

      this.meta.updateTag({
        name: 'description',
        content: this.post.content.split('\n')[0],
      });
    }
  }

  /**
   * to go main page
   */
  private _toMain(): void {
    this.router.navigate(['/']);
  }
}
