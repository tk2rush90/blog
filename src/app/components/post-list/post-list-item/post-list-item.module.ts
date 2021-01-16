import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListItemComponent } from './post-list-item.component';
import {RouterModule} from '@angular/router';
import {PostListLabelContainerComponent} from '@scripter/components/post-list/post-list-item/post-list-label-container/post-list-label-container.component';
import {PostLabelModule} from '@scripter/components/post/post-label/post-label.module';
import {PostMarkdownViewerModule} from '@scripter/components/post/post-markdown-viewer/post-markdown-viewer.module';



@NgModule({
  declarations: [PostListItemComponent, PostListLabelContainerComponent],
  exports: [
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostLabelModule,
    PostMarkdownViewerModule,
  ]
})
export class PostListItemModule { }
