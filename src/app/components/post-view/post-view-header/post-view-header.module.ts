import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewHeaderComponent } from './post-view-header.component';
import {InlineButtonModule} from '@scripter/components/common/inline-button/inline-button.module';
import {RouterModule} from '@angular/router';
import {ConfirmModalModule} from '@scripter/components/common/confirm-modal/confirm-modal.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';



@NgModule({
  declarations: [PostViewHeaderComponent],
  exports: [
    PostViewHeaderComponent
  ],
  imports: [
    CommonModule,
    InlineButtonModule,
    RouterModule,
    ConfirmModalModule,
    LoadingSpotModule,
  ]
})
export class PostViewHeaderModule { }
