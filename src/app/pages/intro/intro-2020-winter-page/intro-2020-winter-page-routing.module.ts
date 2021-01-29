import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Intro2020WinterPageComponent } from './intro-2020-winter-page.component';

const routes: Routes = [{ path: '', component: Intro2020WinterPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Intro2020WinterPageRoutingModule { }
