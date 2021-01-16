import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewLabelContainerComponent } from './post-view-label-container.component';
import {PostLabelModule} from '@scripter/components/post/post-label/post-label.module';



@NgModule({
  declarations: [PostViewLabelContainerComponent],
  exports: [
    PostViewLabelContainerComponent
  ],
  imports: [
    CommonModule,
    PostLabelModule
  ]
})
export class PostViewLabelContainerModule { }
