import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-cancel',
  templateUrl: './icon-cancel.component.html',
  styleUrls: ['./icon-cancel.component.scss']
})
export class IconCancelComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
