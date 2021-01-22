import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevGuard} from '@scripter/guards/dev.guard';
import {AuthGuard} from '@scripter/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'post/list',
  },
  {
    path: 'components',
    loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
    canActivate: [
      DevGuard,
    ],
  },
  {
    path: 'post/list',
    loadChildren: () => import('./pages/post-list-page/post-list-page.module').then(m => m.PostListPageModule)
  },
  {
    path: 'post/view',
    loadChildren: () => import('./pages/post-view-page/post-view-page.module').then(m => m.PostViewPageModule)
  },
  {
    path: 'post/search',
    loadChildren: () => import('./pages/post-search-page/post-search-page.module').then(m => m.PostSearchPageModule)
  },
  {
    path: 'post/editor',
    loadChildren: () => import('./pages/post-editor-page/post-editor-page.module').then(m => m.PostEditorPageModule),
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPageModule)
  },
  { path: 'intro', loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
