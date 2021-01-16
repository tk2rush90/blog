import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';
import {Intro2020WinterModule} from '@scripter/components/intro/intro-2020-winter/intro-2020-winter.module';


@NgModule({
  declarations: [IntroComponent],
  imports: [
    CommonModule,
    IntroRoutingModule,
    Intro2020WinterModule
  ]
})
export class IntroModule { }
