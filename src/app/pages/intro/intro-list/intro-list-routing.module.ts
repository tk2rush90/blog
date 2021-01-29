import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroListComponent } from './intro-list.component';

const routes: Routes = [{ path: '', component: IntroListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroListRoutingModule { }
