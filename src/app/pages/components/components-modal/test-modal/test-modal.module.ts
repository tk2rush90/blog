import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModalComponent } from './test-modal.component';



@NgModule({
  declarations: [TestModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TestModalComponent,
  ],
  entryComponents: [
    TestModalComponent,
  ]
})
export class TestModalModule { }
