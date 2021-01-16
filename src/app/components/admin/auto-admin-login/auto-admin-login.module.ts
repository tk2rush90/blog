import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoAdminLoginComponent } from './auto-admin-login.component';



@NgModule({
  declarations: [AutoAdminLoginComponent],
  exports: [
    AutoAdminLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutoAdminLoginModule { }
