import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsAdminLoginRoutingModule } from './components-admin-login-routing.module';
import { ComponentsAdminLoginComponent } from './components-admin-login.component';
import {AutoAdminLoginModule} from '@scripter/components/admin/auto-admin-login/auto-admin-login.module';


@NgModule({
  declarations: [ComponentsAdminLoginComponent],
  imports: [
    CommonModule,
    ComponentsAdminLoginRoutingModule,
    AutoAdminLoginModule
  ]
})
export class ComponentsAdminLoginModule { }
