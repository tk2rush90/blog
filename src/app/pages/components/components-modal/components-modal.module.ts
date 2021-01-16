import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModalRoutingModule } from './components-modal-routing.module';
import { ComponentsModalComponent } from './components-modal.component';
import {TestModalModule} from '@scripter/pages/components/components-modal/test-modal/test-modal.module';


@NgModule({
  declarations: [ComponentsModalComponent],
  imports: [
    CommonModule,
    ComponentsModalRoutingModule,
    TestModalModule,
  ],
})
export class ComponentsModalModule { }
