import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostLabelComponent} from '@scripter/components/post/post-label/post-label.component';
import {IconsModule} from '@scripter/components/common/icons/icons.module';



@NgModule({
  declarations: [
    PostLabelComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
  ],
  exports: [
    PostLabelComponent,
  ]
})
export class PostLabelModule { }
