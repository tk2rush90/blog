import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlCodeCopierComponent } from './html-code-copier.component';
import {FormFieldModule} from '@scripter/components/common/form-field/form-field.module';
import {InputModule} from '@scripter/components/common/input/input.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [HtmlCodeCopierComponent],
  exports: [
    HtmlCodeCopierComponent
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    InputModule,
    FormsModule
  ]
})
export class HtmlCodeCopierModule { }
