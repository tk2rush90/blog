import {Component, Input, OnInit} from '@angular/core';

export type ViewToggleType = 'both' | 'left' | 'right';
export const BOTH = 'both';
export const LEFT = 'left';
export const RIGHT = 'right';

@Component({
  selector: 'app-view-toggle-icon',
  templateUrl: './view-toggle-icon.component.html',
  styleUrls: ['./view-toggle-icon.component.scss']
})
export class ViewToggleIconComponent implements OnInit {
  // view toggle type
  @Input() type: ViewToggleType | undefined;
  // status constants
  readonly both: ViewToggleType = BOTH;
  readonly left: ViewToggleType = LEFT;
  readonly right: ViewToggleType = RIGHT;

  constructor() { }

  ngOnInit(): void {
  }

}
