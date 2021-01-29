import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroListItemComponent } from './intro-list-item.component';



@NgModule({
  declarations: [IntroListItemComponent],
  exports: [
    IntroListItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IntroListItemModule { }
