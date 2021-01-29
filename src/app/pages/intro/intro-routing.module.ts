import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '2020-winter',
      },
      {
        path: 'list',
        loadChildren: () => import('./intro-list/intro-list.module').then(m => m.IntroListModule)
      },
      {
        path: '2020-winter',
        loadChildren: () => import('./intro-2020-winter-page/intro-2020-winter-page.module').then(m => m.Intro2020WinterPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroRoutingModule { }
