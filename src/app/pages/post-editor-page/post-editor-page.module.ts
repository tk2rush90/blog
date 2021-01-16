import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostEditorPageRoutingModule } from './post-editor-page-routing.module';
import { PostEditorPageComponent } from './post-editor-page.component';
import {PostEditorModule} from '@scripter/components/post-editor/post-editor/post-editor.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';


@NgModule({
  declarations: [PostEditorPageComponent],
  imports: [
    CommonModule,
    PostEditorPageRoutingModule,
    PostEditorModule,
    LoadingSpotModule
  ]
})
export class PostEditorPageModule { }
