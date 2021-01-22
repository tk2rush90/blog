import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostSearchPageRoutingModule } from './post-search-page-routing.module';
import { PostSearchPageComponent } from './post-search-page.component';
import {HeaderModule} from '@scripter/components/common/header/header.module';
import {PostListHeaderModule} from '@scripter/components/post-list/post-list-header/post-list-header.module';
import {PostListItemModule} from '@scripter/components/post-list/post-list-item/post-list-item.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';
import {FooterModule} from '@scripter/components/common/footer/footer.module';


@NgModule({
  declarations: [PostSearchPageComponent],
  imports: [
    CommonModule,
    PostSearchPageRoutingModule,
    HeaderModule,
    PostListHeaderModule,
    PostListItemModule,
    LoadingSpotModule,
    FooterModule
  ]
})
export class PostSearchPageModule { }
