import {Component, Input, OnInit} from '@angular/core';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-post-markdown-viewer',
  templateUrl: './post-markdown-viewer.component.html',
  styleUrls: ['./post-markdown-viewer.component.scss']
})
export class PostMarkdownViewerComponent implements OnInit {
  // markdown content
  @Input() content = '';

  constructor(
    private markdownService: MarkdownService,
  ) { }

  ngOnInit(): void {
    this._overrideMarkdownRenderer();
  }

  /**
   * override renderer for markdown
   */
  private _overrideMarkdownRenderer(): void {
    this.markdownService.renderer.link = (href, title, text): string => {
      return `<a href="${href || ''}" title="${title || ''}" target="_blank">${text}</a>`;
    };
  }
}
