import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListHeaderComponent } from './post-list-header.component';
import { PostCategoriesComponent } from './post-categories/post-categories.component';
import {RouterModule} from '@angular/router';
import { PostSearchComponent } from './post-search/post-search.component';
import {IconsModule} from '@scripter/components/common/icons/icons.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [PostListHeaderComponent, PostCategoriesComponent, PostSearchComponent],
  exports: [
    PostListHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    ReactiveFormsModule,
  ]
})
export class PostListHeaderModule { }
