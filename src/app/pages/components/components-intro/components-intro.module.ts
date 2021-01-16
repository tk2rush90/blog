import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsIntroRoutingModule } from './components-intro-routing.module';
import { ComponentsIntroComponent } from './components-intro.component';
import {Intro2020WinterModule} from '@scripter/components/intro/intro-2020-winter/intro-2020-winter.module';


@NgModule({
  declarations: [ComponentsIntroComponent],
  imports: [
    CommonModule,
    ComponentsIntroRoutingModule,
    Intro2020WinterModule
  ]
})
export class ComponentsIntroModule { }
