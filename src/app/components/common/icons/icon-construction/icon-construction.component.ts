import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-construction',
  templateUrl: './icon-construction.component.html',
  styleUrls: ['./icon-construction.component.scss']
})
export class IconConstructionComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
