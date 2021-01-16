import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {finalize} from 'rxjs/operators';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {getPostErrorMessage} from '@scripter/utils/post-error.util';

@Component({
  selector: 'app-post-editor-page',
  templateUrl: './post-editor-page.component.html',
  styleUrls: ['./post-editor-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostEditorPageComponent implements OnInit, OnDestroy {
  // loading state
  loading = false;
  // post id
  private _id: string | undefined;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private postApiService: PostApiService,
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeRouteParams();
  }

  ngOnDestroy(): void {
    this.postEditorService.reset();
  }

  /**
   * subscribe route params to get post by category
   */
  private _subscribeRouteParams(): void {
    const sub = this.activatedRoute.paramMap
      .subscribe(res => {
        this._id = res.get('id') || undefined;
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
            this.postEditorService.post = res;
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
