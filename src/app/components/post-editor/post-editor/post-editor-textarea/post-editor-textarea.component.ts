import { Component, OnInit } from '@angular/core';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-post-editor-textarea',
  templateUrl: './post-editor-textarea.component.html',
  styleUrls: ['./post-editor-textarea.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class PostEditorTextareaComponent implements OnInit {
  // post model
  post: PostModel | undefined;

  constructor(
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribePost();
  }

  /**
   * return the post content
   */
  get content(): string {
    return this.post?.content || '';
  }

  /**
   * set the post content
   * @param content content to set
   */
  set content(content: string) {
    if (this.post) {
      this.post.content = content;
    }
  }

  /**
   * subscribe post model from service
   */
  private _subscribePost(): void {
    const sub = this.postEditorService
      .post$
      .subscribe(res => {
        this.post = res;
      });

    this.subscriptionService.store('_subscribePost', sub);
  }
}
