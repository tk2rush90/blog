import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateCheckerComponent } from './update-checker.component';
import {IconsModule} from '@scripter/components/common/icons/icons.module';
import {FlatButtonModule} from '@scripter/components/common/flat-button/flat-button.module';



@NgModule({
  declarations: [UpdateCheckerComponent],
  exports: [
    UpdateCheckerComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    FlatButtonModule
  ]
})
export class UpdateCheckerModule { }
