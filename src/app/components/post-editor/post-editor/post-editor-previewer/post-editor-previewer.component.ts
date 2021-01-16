import { Component, OnInit } from '@angular/core';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-post-editor-previewer',
  templateUrl: './post-editor-previewer.component.html',
  styleUrls: ['./post-editor-previewer.component.scss']
})
export class PostEditorPreviewerComponent implements OnInit {
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
