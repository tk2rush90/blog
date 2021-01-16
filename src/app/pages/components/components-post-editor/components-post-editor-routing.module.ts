import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsPostEditorComponent } from './components-post-editor.component';

const routes: Routes = [{ path: '', component: ComponentsPostEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsPostEditorRoutingModule { }
