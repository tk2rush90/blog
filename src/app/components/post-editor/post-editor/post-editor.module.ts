import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostEditorComponent } from './post-editor.component';
import { PostEditorHeaderComponent } from './post-editor-header/post-editor-header.component';
import { EditorViewToggleComponent } from './post-editor-header/editor-view-toggle/editor-view-toggle.component';
import {ViewToggleIconModule} from '@scripter/components/common/view-toggle-icon/view-toggle-icon.module';
import {FormControlBaseModule} from '@scripter/components/common/form-control-base/form-control-base.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostEditorTextareaComponent } from './post-editor-textarea/post-editor-textarea.component';
import { PostEditorPreviewerComponent } from './post-editor-previewer/post-editor-previewer.component';
import {PostMarkdownViewerModule} from '@scripter/components/post/post-markdown-viewer/post-markdown-viewer.module';
import {InlineButtonModule} from '@scripter/components/common/inline-button/inline-button.module';
import {FlatButtonModule} from '@scripter/components/common/flat-button/flat-button.module';
import { DraftModalComponent } from './draft-modal/draft-modal.component';
import {ModalModule} from '@scripter/components/common/modal/modal.module';
import {DraftListItemComponent} from '@scripter/components/post-editor/post-editor/draft-modal/draft-list-item/draft-list-item.component';
import {ScrollDetectorModule} from '@scripter/components/common/scroll-detector/scroll-detector.module';
import { PublishModalComponent } from './publish-modal/publish-modal.component';
import {FormFieldModule} from '@scripter/components/common/form-field/form-field.module';
import {InputModule} from '@scripter/components/common/input/input.module';
import { PostTitleInputComponent } from './publish-modal/post-title-input/post-title-input.component';
import { PostCategorySelectComponent } from './publish-modal/post-category-select/post-category-select.component';
import { PostLabelInputComponent } from './publish-modal/post-label-input/post-label-input.component';
import {SelectModule} from '@scripter/components/common/select/select.module';
import {LoadingSpotModule} from '@scripter/components/common/loading-spot/loading-spot.module';
import {ConfirmModalModule} from '@scripter/components/common/confirm-modal/confirm-modal.module';
import {PostLabelModule} from '@scripter/components/post/post-label/post-label.module';



@NgModule({
  declarations: [
    PostEditorComponent,
    PostEditorHeaderComponent,
    EditorViewToggleComponent,
    PostEditorTextareaComponent,
    PostEditorPreviewerComponent,
    DraftModalComponent,
    DraftListItemComponent,
    PublishModalComponent,
    PostTitleInputComponent,
    PostCategorySelectComponent,
    PostLabelInputComponent,
  ],
  exports: [
    PostEditorComponent
  ],
  imports: [
    CommonModule,
    ViewToggleIconModule,
    FormControlBaseModule,
    FormsModule,
    PostMarkdownViewerModule,
    InlineButtonModule,
    FlatButtonModule,
    ModalModule,
    ScrollDetectorModule,
    FormFieldModule,
    InputModule,
    FormControlBaseModule,
    ReactiveFormsModule,
    SelectModule,
    LoadingSpotModule,
    ConfirmModalModule,
    PostLabelModule,
  ],
  entryComponents: [
    DraftModalComponent,
  ]
})
export class PostEditorModule { }
