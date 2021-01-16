import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsPostsComponent } from './components-posts.component';

const routes: Routes = [{ path: '', component: ComponentsPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsPostsRoutingModule { }
