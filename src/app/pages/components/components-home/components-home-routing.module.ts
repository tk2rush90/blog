import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsHomeComponent } from './components-home.component';

const routes: Routes = [{ path: '', component: ComponentsHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsHomeRoutingModule { }
