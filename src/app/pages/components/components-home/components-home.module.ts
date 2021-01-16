import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsHomeRoutingModule } from './components-home-routing.module';
import { ComponentsHomeComponent } from './components-home.component';


@NgModule({
  declarations: [ComponentsHomeComponent],
  imports: [
    CommonModule,
    ComponentsHomeRoutingModule
  ]
})
export class ComponentsHomeModule { }
