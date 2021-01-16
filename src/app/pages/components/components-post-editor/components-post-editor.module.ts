import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsPostEditorRoutingModule } from './components-post-editor-routing.module';
import { ComponentsPostEditorComponent } from './components-post-editor.component';
import {PostEditorModule} from '@scripter/components/post-editor/post-editor/post-editor.module';


@NgModule({
  declarations: [ComponentsPostEditorComponent],
  imports: [
    CommonModule,
    ComponentsPostEditorRoutingModule,
    PostEditorModule
  ]
})
export class ComponentsPostEditorModule { }
