import { Component, OnInit } from '@angular/core';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {SiteAddModalComponent} from '@scripter/components/post-editor/post-editor/site-add-modal/site-add-modal.component';
import {VideoAddModalComponent} from '@scripter/components/post-editor/post-editor/video-add-modal/video-add-modal.component';

@Component({
  selector: 'app-tools-modal',
  templateUrl: './tools-modal.component.html',
  styleUrls: ['./tools-modal.component.scss']
})
export class ToolsModalComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * open site add modal
   */
  openSiteAddModal(): void {
    this.modalService.open(SiteAddModalComponent, {
      closeOnNavigating: true,
    });
  }

  /**
   * open video add modal
   */
  openVideoAddModal(): void {
    this.modalService.open(VideoAddModalComponent, {
      closeOnNavigating: true,
    });
  }
}
