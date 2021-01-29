import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroBaseComponent } from './intro-base.component';



@NgModule({
  declarations: [IntroBaseComponent],
  imports: [
    CommonModule
  ],
  exports: [
    IntroBaseComponent,
  ]
})
export class IntroBaseModule { }
