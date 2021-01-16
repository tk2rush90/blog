import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsAdminLoginComponent } from './components-admin-login.component';

const routes: Routes = [{ path: '', component: ComponentsAdminLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsAdminLoginRoutingModule { }
