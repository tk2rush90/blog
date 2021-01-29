import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Intro2020WinterComponent } from './intro-2020-winter.component';
import {RouterModule} from '@angular/router';
import {IntroBaseModule} from '@scripter/components/intro/intro-base/intro-base.module';


@NgModule({
  declarations: [Intro2020WinterComponent],
  exports: [
    Intro2020WinterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IntroBaseModule,
  ]
})
export class Intro2020WinterModule { }
