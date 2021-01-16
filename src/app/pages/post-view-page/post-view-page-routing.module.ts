import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostViewPageComponent } from './post-view-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: PostViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostViewPageRoutingModule { }
