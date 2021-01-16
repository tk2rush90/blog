import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostEditorPageComponent } from './post-editor-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostEditorPageComponent,
  },
  {
    path: ':id',
    component: PostEditorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostEditorPageRoutingModule { }
