import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListHeaderComponent } from './post-list-header.component';
import { PostCategoriesComponent } from './post-categories/post-categories.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PostListHeaderComponent, PostCategoriesComponent],
  exports: [
    PostListHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PostListHeaderModule { }
