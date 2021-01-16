import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import {AutoAdminLoginModule} from '@scripter/components/admin/auto-admin-login/auto-admin-login.module';


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    AutoAdminLoginModule
  ]
})
export class AdminPageModule { }
