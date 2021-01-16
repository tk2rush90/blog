import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModalComponent } from './components-modal.component';

const routes: Routes = [{ path: '', component: ComponentsModalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsModalRoutingModule { }
