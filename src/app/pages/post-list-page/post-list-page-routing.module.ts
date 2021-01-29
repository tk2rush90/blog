import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListPageComponent } from './post-list-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all',
  },
  {
    path: ':category',
    component: PostListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostListPageRoutingModule { }
