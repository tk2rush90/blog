import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListPageComponent } from './post-list-page.component';
import {environment} from '../../../environments/environment';

const {
  categories,
} = environment;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: categories[0].value,
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
