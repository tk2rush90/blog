import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Intro2020WinterComponent } from './intro-2020-winter.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [Intro2020WinterComponent],
  exports: [
    Intro2020WinterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class Intro2020WinterModule { }
