import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsIntroComponent } from './components-intro.component';

const routes: Routes = [{ path: '', component: ComponentsIntroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsIntroRoutingModule { }
