import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListPageRoutingModule } from './post-list-page-routing.module';
import { PostListPageComponent } from './post-list-page.component';
import {HeaderModule} from '@scripter/components/common/header/header.module';
import {PostListItemModule} from '@scripter/components/post-list/post-list-item/post-list-item.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';
import {FooterModule} from '@scripter/components/common/footer/footer.module';
import {PostListHeaderModule} from '@scripter/components/post-list/post-list-header/post-list-header.module';


@NgModule({
  declarations: [PostListPageComponent],
  imports: [
    CommonModule,
    PostListPageRoutingModule,
    HeaderModule,
    PostListItemModule,
    LoadingSpotModule,
    FooterModule,
    PostListHeaderModule
  ]
})
export class PostListPageModule { }
