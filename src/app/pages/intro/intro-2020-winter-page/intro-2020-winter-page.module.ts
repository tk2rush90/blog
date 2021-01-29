import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Intro2020WinterPageRoutingModule } from './intro-2020-winter-page-routing.module';
import { Intro2020WinterPageComponent } from './intro-2020-winter-page.component';
import {Intro2020WinterModule} from '@scripter/components/intro/intro-2020-winter/intro-2020-winter.module';


@NgModule({
  declarations: [Intro2020WinterPageComponent],
  imports: [
    CommonModule,
    Intro2020WinterPageRoutingModule,
    Intro2020WinterModule
  ]
})
export class Intro2020WinterPageModule { }
