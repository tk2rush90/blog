import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-close',
  templateUrl: './icon-close.component.html',
  styleUrls: ['./icon-close.component.scss']
})
export class IconCloseComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
