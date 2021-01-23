import {Component, Input, OnInit} from '@angular/core';

export type ToolOptionIcon = 'web' | 'movie-creation';

@Component({
  selector: 'app-tool-option-item',
  templateUrl: './tool-option-item.component.html',
  styleUrls: ['./tool-option-item.component.scss']
})
export class ToolOptionItemComponent implements OnInit {
  // tool option icon
  @Input() icon: ToolOptionIcon | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
