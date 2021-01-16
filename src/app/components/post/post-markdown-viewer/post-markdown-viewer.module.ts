import {NgModule, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostMarkdownViewerComponent} from './post-markdown-viewer.component';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [PostMarkdownViewerComponent],
  exports: [
    PostMarkdownViewerComponent,
  ],
  imports: [
    CommonModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
  ]
})
export class PostMarkdownViewerModule { }
