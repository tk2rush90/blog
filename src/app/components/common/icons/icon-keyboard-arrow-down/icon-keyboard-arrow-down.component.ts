import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-keyboard-arrow-down',
  templateUrl: './icon-keyboard-arrow-down.component.html',
  styleUrls: ['./icon-keyboard-arrow-down.component.scss']
})
export class IconKeyboardArrowDownComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
