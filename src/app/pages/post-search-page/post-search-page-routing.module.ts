import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSearchPageComponent } from './post-search-page.component';

const routes: Routes = [
  { path: ':type', component: PostSearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostSearchPageRoutingModule { }
