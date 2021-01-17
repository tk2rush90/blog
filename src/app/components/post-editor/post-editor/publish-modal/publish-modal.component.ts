import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostModel} from '@scripter/models/post-model';
import {PostApiService} from '@scripter/services/api/post-api.service';
import {AuthService} from '@scripter/services/common/auth.service';
import {AuthResponse} from '@scripter/models/google-models';
import {finalize} from 'rxjs/operators';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {ConfirmModalComponent} from '@scripter/components/common/confirm-modal/confirm-modal.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService, ToastType} from '@scripter/components/common/toast/service/toast.service';
import {Router} from '@angular/router';
import {DRAFT} from '@scripter/utils/type.util';
import {getPostErrorMessage} from '@scripter/utils/post-error.util';
import {MODAL_REF, ModalRef} from '@scripter/components/common/modal/models/modal-ref';

@Component({
  selector: 'app-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PublishModalComponent implements OnInit, OnDestroy {
  // title control
  title: FormControl = new FormControl('', Validators.required);
  // category control
  category: FormControl = new FormControl('', Validators.required);
  // labels control
  labels: FormControl = new FormControl('');
  // group
  group: FormGroup = new FormGroup({
    title: this.title,
    category: this.category,
    labels: this.labels,
  });
  // loading state
  loading = false;
  // post model
  private _post: PostModel | undefined;
  // user info
  private _authResponse: AuthResponse | undefined;

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<PublishModalComponent>,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: ModalService,
    private postApiService: PostApiService,
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribePost();
    this._subscribeAuthResponse();
    this._subscribeSigningFailed();
  }

  ngOnDestroy(): void {
    this._updatePostModel();
  }

  /**
   * return `true` when editing the post
   */
  get isEditing(): boolean {
    return !!this._post?.id;
  }

  /**
   * return `true` when post is draft
   */
  get isDraft(): boolean {
    return this._post?.status === 'DRAFT';
  }

  /**
   * return `true` when the post is ready to submit
   */
  get readyToSubmit(): boolean {
    return !!(!this.loading && this._authResponse && this._post);
  }

  /**
   * subscribe post model from service
   */
  private _subscribePost(): void {
    const sub = this.postEditorService
      .post$
      .subscribe(res => {
        this._post = res;
        this._patchGroupValues();
      });

    this.subscriptionService.store('_subscribePost', sub);
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
   * patch group values with post model
   */
  private _patchGroupValues(): void {
    if (this._post) {
      this.title.patchValue(this._post.title || '');
      this.category.patchValue(this._post.category || '');
      this.labels.patchValue(this._post.labels.join(',') || '');
    }
  }

  /**
   * update post model for service
   */
  private _updatePostModel(): void {
    if (this._post) {
      this._post.title = this.title.value;
      this._post.category = this.category.value;
      this._post.labels = (this.labels.value || '').split(',').filter((value: string) => value);
    }
  }

  /**
   * create draft post
   */
  createDraftPost(): void {
    if (this.readyToSubmit) {
      this._updatePostModel();

      const sub = this.postApiService
        .createPost(this._post as PostModel, true, this._authResponse as AuthResponse)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            if (res) {
              this.postEditorService.post = res;
              this.toastService.open({
                message: '초안이 등록되었습니다',
              });

              this.modalRef.close();
            }
          },
          error: err => {
            this._handleErrorResponse(err);
          }
        });

      this.subscriptionService.store('_createDraftPost', sub);
      this.loading = true;
    }
  }

  /**
   * create new post
   */
  createPost(): void {
    if (this.readyToSubmit) {
      this._updatePostModel();

      const sub = this.postApiService
        .createPost(this._post as PostModel, false, this._authResponse as AuthResponse)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            if (res) {
              this.toastService.open({
                message: '발행되었습니다',
              });

              this._toPostView(res);
            }
          },
        });

      this.subscriptionService.store('_createPost', sub);
      this.loading = true;
    }
  }

  /**
   * update post
   */
  updatePost(callback?: () => void): void {
    if (this.readyToSubmit) {
      this._updatePostModel();

      const sub = this.postApiService
        .updatePost(this._post as PostModel, this._authResponse as AuthResponse)
        .pipe(finalize(() => {
          if (!callback) {
            this.loading = false;
          }
        }))
        .subscribe({
          next: res => {
            if (res) {
              this.postEditorService.post = res;

              if (callback) {
                callback();
              } else {
                this.toastService.open({
                  message: '수정되었습니다',
                });

                if (res.status !== 'DRAFT') {
                  this._toPostView(res);
                } else {
                  this.modalRef.close();
                }
              }
            }
          },
          error: err => {
            this._handleErrorResponse(err);
          }
        });

      this.subscriptionService.store('_updateDraftPost', sub);
      this.loading = true;
    }
  }

  /**
   * revert post to draft
   * update post before reverting
   */
  revertPost(): void {
    if (this.readyToSubmit) {
      this.updatePost(() => {
        this._revertPost();
      });
    }
  }

  /**
   * real method to update post
   */
  private _revertPost(): void {
    const sub = this.postApiService
      .revertPost(this._post as PostModel, this._authResponse as AuthResponse)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          if (res) {
            this.postEditorService.post = res;
            this.toastService.open({
              message: '초안으로 되돌렸습니다',
            });

            this.modalRef.close();
          }
        },
        error: err => {
          this._handleErrorResponse(err);
        }
      });

    this.subscriptionService.store('revertPost', sub);
    this.loading = true;
  }

  /**
   * publish the draft post
   * update post before publishing
   */
  publishPost(): void {
    if (this.readyToSubmit) {
      this.updatePost(() => {
        this._publishPost();
      });
    }
  }

  /**
   * real method to publish post
   */
  private _publishPost(): void {
    const sub = this.postApiService
      .publishPost(this._post as PostModel, this._authResponse as AuthResponse)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          if (res) {
            this.toastService.open({
              message: '발행되었습니다',
            });

            this._toPostView(res);
          }
        },
        error: err => {
          this._handleErrorResponse(err);
        }
      });

    this.subscriptionService.store('publishPost', sub);
    this.loading = true;
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
    if (this.readyToSubmit) {
      const sub = this.postApiService
        .deletePost(this._post as PostModel, this._authResponse as AuthResponse)
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
   * go to post detail
   * @param post post model
   */
  private _toPostView(post: PostModel): void {
    this.router.navigate(['/post/view', post.id]);
  }

  /**
   * go to main page
   */
  private _toMain(): void {
    this.router.navigate(['/']);
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

        this._toMain();
      });

    this.subscriptionService.store('_subscribeSigningFailed', sub);
  }
}
