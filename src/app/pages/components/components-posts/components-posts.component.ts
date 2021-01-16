import { Component, OnInit } from '@angular/core';
import {IPostRequest, PostApiService} from '@scripter/services/api/post-api.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostListResponseModel} from '@scripter/models/post-list-response-model';
import {DRAFT} from '@scripter/utils/type.util';
import {AuthService} from '@scripter/services/common/auth.service';
import {AuthResponse} from '@scripter/models/google-models';

@Component({
  selector: 'app-components-posts',
  templateUrl: './components-posts.component.html',
  styleUrls: ['./components-posts.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class ComponentsPostsComponent implements OnInit {
  // post response model
  response: PostListResponseModel | undefined;
  // get posts for admin
  showDrafts = false;
  // user
  authResponse: AuthResponse | undefined;

  constructor(
    private authService: AuthService,
    private postApiService: PostApiService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeAuthResponse();
    this.getPosts();
  }

  /**
   * subscribe auth response data
   */
  private _subscribeAuthResponse(): void {
    const sub = this.authService
      .authResponse$
      .subscribe(res => {
        this.authResponse = res;
      });

    this.subscriptionService.store('_subscribeAuthResponse', sub);
  }

  /**
   * get posts with category string
   * @param category category string
   */
  getPosts(category?: string): void {
    const request: IPostRequest = {
      category,
      status: this.showDrafts ? DRAFT : undefined,
    };

    const sub = this.postApiService
      .getPosts(request, this.authResponse)
      .subscribe({
        next: res => {
          this.response = res;
        },
      });

    this.subscriptionService.store('_getAllPosts', sub);
  }
}
