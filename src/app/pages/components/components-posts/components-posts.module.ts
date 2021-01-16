import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsPostsRoutingModule } from './components-posts-routing.module';
import { ComponentsPostsComponent } from './components-posts.component';
import {PostListItemModule} from '@scripter/components/post-list/post-list-item/post-list-item.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ComponentsPostsComponent],
  imports: [
    CommonModule,
    ComponentsPostsRoutingModule,
    PostListItemModule,
    FormsModule
  ]
})
export class ComponentsPostsModule { }
