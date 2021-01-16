import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewToggleIconComponent } from './view-toggle-icon.component';



@NgModule({
  declarations: [ViewToggleIconComponent],
  exports: [
    ViewToggleIconComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewToggleIconModule { }
