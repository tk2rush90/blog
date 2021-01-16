import { Component, OnInit } from '@angular/core';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {BOTH, ViewToggleType} from '@scripter/components/common/view-toggle-icon/view-toggle-icon.component';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {DraftModalComponent} from '@scripter/components/post-editor/post-editor/draft-modal/draft-modal.component';
import {PublishModalComponent} from '@scripter/components/post-editor/post-editor/publish-modal/publish-modal.component';
import {ConfirmModalComponent} from '@scripter/components/common/confirm-modal/confirm-modal.component';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-post-editor-header',
  templateUrl: './post-editor-header.component.html',
  styleUrls: ['./post-editor-header.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class PostEditorHeaderComponent implements OnInit {
  // view type
  view: ViewToggleType = BOTH;

  constructor(
    private modalService: ModalService,
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeView();
  }

  /**
   * subscribe view value
   */
  private _subscribeView(): void {
    const sub = this.postEditorService
      .view$
      .subscribe(res => {
        this.view = res;
      });

    this.subscriptionService.store('_subscribeView', sub);
  }

  /**
   * update view toggle type to service
   * @param view view type
   */
  onViewChange(view: ViewToggleType): void {
    this.postEditorService.view = view;
  }

  /**
   * open confirm modal for new post
   */
  openConfirmModalForNewPost(): void {
    this.modalService.open(ConfirmModalComponent, {
      data: '새 글을 작성하시겠습니까? 변경 내역이 저장되지 않습니다',
      onClose: (result: boolean) => {
        if (result) {
          this._createNewPost();
        }
      }
    });
  }

  /**
   * create new post model
   */
  private _createNewPost(): void {
    this.postEditorService.post = new PostModel();
  }

  /**
   * open draft modal
   */
  openDraftModal(): void {
    this.modalService.open(DraftModalComponent, {
      closeOnNavigating: true,
    });
  }

  /**
   * open publish modal
   */
  openPublishModal(): void {
    this.modalService.open(PublishModalComponent, {
      closeOnNavigating: true,
    });
  }
}
