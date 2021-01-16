import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./components-home/components-home.module').then(m => m.ComponentsHomeModule)
      },
      {
        path: 'intro',
        loadChildren: () => import('./components-intro/components-intro.module').then(m => m.ComponentsIntroModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./components-posts/components-posts.module').then(m => m.ComponentsPostsModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./components-admin-login/components-admin-login.module').then(m => m.ComponentsAdminLoginModule)
      },
      {
        path: 'post-editor',
        loadChildren: () => import('./components-post-editor/components-post-editor.module').then(m => m.ComponentsPostEditorModule)
      },
    ]
  },
  { path: 'modal', loadChildren: () => import('./components-modal/components-modal.module').then(m => m.ComponentsModalModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
