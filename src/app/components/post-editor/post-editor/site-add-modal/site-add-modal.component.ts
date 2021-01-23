import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-add-modal',
  templateUrl: './site-add-modal.component.html',
  styleUrls: ['./site-add-modal.component.scss']
})
export class SiteAddModalComponent implements OnInit {
  // site name
  name = '';
  // site url
  url = '';
  // site thumbnail
  thumbnail = '';
  // html code
  html = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * create html code with fields
   */
  createHtmlCode(): void {
    const htmlCodes: string[] = [];

    htmlCodes.push(`<a target="_blank" href="${this.url}" class="scripter-site-wrapper">`);

    if (this.thumbnail) {
      htmlCodes.push(`  <img src="${this.thumbnail}" alt="${this.name}"/>`);
    }

    htmlCodes.push(`  <div class="scripter-site-info-wrapper">`);
    htmlCodes.push(`    <div class="scripter-site-name">`);
    htmlCodes.push(`      ${this.name}`);
    htmlCodes.push(`    </div>`);
    htmlCodes.push(`    <span class="scripter-site-url">${this.url}</span>`);
    htmlCodes.push(`  </div>`);
    htmlCodes.push(`</a>`);

    this.html = htmlCodes.join('\n');
  }
}
