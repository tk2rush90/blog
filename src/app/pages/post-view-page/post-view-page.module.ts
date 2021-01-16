import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewPageRoutingModule } from './post-view-page-routing.module';
import { PostViewPageComponent } from './post-view-page.component';
import {HeaderModule} from '@scripter/components/common/header/header.module';
import {PostViewHeaderModule} from '@scripter/components/post-view/post-view-header/post-view-header.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';
import {PostMarkdownViewerModule} from '@scripter/components/post/post-markdown-viewer/post-markdown-viewer.module';
import {PostViewLabelContainerModule} from '@scripter/components/post-view/post-view-label-container/post-view-label-container.module';
import {FooterModule} from '@scripter/components/common/footer/footer.module';


@NgModule({
  declarations: [PostViewPageComponent],
  imports: [
    CommonModule,
    PostViewPageRoutingModule,
    HeaderModule,
    PostViewHeaderModule,
    LoadingSpotModule,
    PostMarkdownViewerModule,
    PostViewLabelContainerModule,
    FooterModule
  ]
})
export class PostViewPageModule { }
