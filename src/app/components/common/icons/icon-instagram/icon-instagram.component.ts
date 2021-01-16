import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-instagram',
  templateUrl: './icon-instagram.component.html',
  styleUrls: ['./icon-instagram.component.scss']
})
export class IconInstagramComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
