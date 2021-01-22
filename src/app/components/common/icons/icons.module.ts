import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCancelComponent } from './icon-cancel/icon-cancel.component';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';
import { IconKeyboardArrowDownComponent } from './icon-keyboard-arrow-down/icon-keyboard-arrow-down.component';
import { IconInstagramComponent } from './icon-instagram/icon-instagram.component';
import { IconGithubComponent } from './icon-github/icon-github.component';
import { IconCloseComponent } from './icon-close/icon-close.component';
import { IconSearchComponent } from './icon-search/icon-search.component';



@NgModule({
  declarations: [
    IconCancelComponent,
    IconBaseComponent,
    IconKeyboardArrowDownComponent,
    IconInstagramComponent,
    IconGithubComponent,
    IconCloseComponent,
    IconSearchComponent
  ],
  exports: [
    IconCancelComponent,
    IconKeyboardArrowDownComponent,
    IconInstagramComponent,
    IconGithubComponent,
    IconCloseComponent,
    IconSearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule { }
