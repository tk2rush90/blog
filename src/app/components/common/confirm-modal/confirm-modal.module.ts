import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import {ModalModule} from '@scripter/components/common/modal/modal.module';
import {InlineButtonModule} from '@scripter/components/common/inline-button/inline-button.module';
import {FlatButtonModule} from '@scripter/components/common/flat-button/flat-button.module';



@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    InlineButtonModule,
    FlatButtonModule
  ],
  exports: [
    ConfirmModalComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
})
export class ConfirmModalModule { }
