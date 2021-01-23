import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-add-modal',
  templateUrl: './video-add-modal.component.html',
  styleUrls: ['./video-add-modal.component.scss']
})
export class VideoAddModalComponent implements OnInit {
  // video url
  url = '';
  // html code
  html = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * create html codes for video
   */
  createHtmlCodes(): void {
    const htmlCodes: string[] = [];

    htmlCodes.push(`<video style="width: 100%; max-width: 500px" src="${this.url}" autoplay controls loop></video>`);

    this.html = htmlCodes.join('\n');
  }
}
