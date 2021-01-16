import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';
import {AuthService} from '@scripter/services/common/auth.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {ConfirmModalComponent} from '@scripter/components/common/confirm-modal/confirm-modal.component';
import {AuthResponse} from '@scripter/models/google-models';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {getPostErrorMessage} from '@scripter/utils/post-error.util';

@Component({
  selector: 'app-post-view-header',
  templateUrl: './post-view-header.component.html',
  styleUrls: ['./post-view-header.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostViewHeaderComponent implements OnInit {
  // post model
  @Input() post: PostModel | undefined;
  // loading state
  loading = false;
  // auth response
  private _authResponse: AuthResponse | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: ModalService,
    private postApiService: PostApiService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeAuthResponse();
    this._subscribeSigningFailed();
  }

  /**
   * return `true` when user is signed in
   */
  get signed$(): Observable<boolean> {
    return this.authService
      .authResponse$
      .pipe(map(res => {
        return !!res;
      }));
  }

  /**
   * subscribe auth response from service
   */
  private _subscribeAuthResponse(): void {
    const sub = this.authService
      .authResponse$
      .subscribe(res => {
        this._authResponse = res;
      });

    this.subscriptionService.store('_subscribeAuthResponse', sub);
  }

  /**
   * delete the draft post
   */
  deletePost(): void {
    this.modalService.open(ConfirmModalComponent, {
      data: '삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다',
      closeOnNavigating: true,
      onClose: (result: boolean) => {
        if (result) {
          this._deletePost();
        }
      }
    });
  }

  /**
   * real method to delete post
   */
  private _deletePost(): void {
    if (this._authResponse) {
      const sub = this.postApiService
        .deletePost(this.post as PostModel, this._authResponse as AuthResponse)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.toastService.open({
              message: '삭제되었습니다',
            });

            this._toMain();
          },
          error: err => {
            this._handleErrorResponse(err);
          }
        });

      this.subscriptionService.store('deletePost', sub);
      this.loading = true;
    }
  }

  /**
   * handle error response
   * @param error error response
   */
  private _handleErrorResponse(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401: {
        this.authService.signIn();
        break;
      }

      default: {
        this.toastService.open({
          message: getPostErrorMessage(error),
          type: ToastType.error,
        });

        break;
      }
    }
  }

  /**
   * subscribe signing failed
   */
  private _subscribeSigningFailed(): void {
    const sub = this.authService.signingFailed
      .subscribe(() => {
        this.toastService.open({
          message: '관리자 인증에 실패했습니다',
          type: ToastType.error,
        });
      });

    this.subscriptionService.store('_subscribeSigningFailed', sub);
  }

  /**
   * go to main page
   */
  private _toMain(): void {
    this.router.navigate(['/']);
  }
}
