import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostModel} from '@scripter/models/post-model';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {finalize} from 'rxjs/operators';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {getPostErrorMessage} from '@scripter/utils/post-error.util';

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
   * to go main page
   */
  private _toMain(): void {
    this.router.navigate(['/']);
  }
}
