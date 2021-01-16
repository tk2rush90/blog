import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderActionsComponent } from './header-actions/header-actions.component';
import {IconsModule} from '@scripter/components/common/icons/icons.module';
import {InlineButtonModule} from '@scripter/components/common/inline-button/inline-button.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, LogoComponent, HeaderActionsComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    InlineButtonModule,
    RouterModule,
  ]
})
export class HeaderModule { }
