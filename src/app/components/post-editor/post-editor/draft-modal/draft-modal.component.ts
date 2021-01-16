import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_REF, ModalRef} from '@scripter/components/common/modal/models/modal-ref';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {IPostRequest, PostApiService} from '@scripter/services/api/post-api.service';
import {DRAFT} from '@scripter/utils/type.util';
import {PostListResponseModel} from '@scripter/models/post-list-response-model';
import {AuthService} from '@scripter/services/common/auth.service';
import {AuthResponse} from '@scripter/models/google-models';
import {finalize} from 'rxjs/operators';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-draft-modal',
  templateUrl: './draft-modal.component.html',
  styleUrls: ['./draft-modal.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class DraftModalComponent implements OnInit {
  // posts
  posts: PostModel[] = [];
  // loading status
  loading = false;
  // post list response
  private _response: PostListResponseModel | undefined;
  // user data
  private _authResponse: AuthResponse | undefined;

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<DraftModalComponent>,
    private authService: AuthService,
    private postApiService: PostApiService,
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeAuthResponse();
  }

  /**
   * return `true` when there are no draft posts
   */
  get empty(): boolean {
    return !this.loading && this.posts.length === 0;
  }

  /**
   * subscribe auth response data
   */
  private _subscribeAuthResponse(): void {
    const sub = this.authService
      .authResponse$
      .subscribe(res => {
        this._authResponse = res;
        this._getDraftPosts();
      });

    this.subscriptionService.store('_subscribeAuthResponse', sub);
  }

  /**
   * get draft posts
   * @param pageToken next page token
   */
  private _getDraftPosts(pageToken?: string): void {
    if (this._authResponse && !this.loading) {
      const request: IPostRequest = {
        pageToken,
        status: DRAFT,
      };

      const sub = this.postApiService
        .getPosts(request, this._authResponse)
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

      this.subscriptionService.store('_getDraftPosts', sub);
      this.loading = true;
    }
  }

  /**
   * get next page when content scrolled to the end
   */
  onContentScrollEnd(): void {
    if (this._response?.nextPageToken) {
      this._getDraftPosts(this._response.nextPageToken);
    }
  }

  /**
   * select draft post
   * @param post post model
   */
  selectPost(post: PostModel): void {
    this.postEditorService.post = post;
    this.modalRef.close();
  }
}
