import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-github',
  templateUrl: './icon-github.component.html',
  styleUrls: ['./icon-github.component.scss']
})
export class IconGithubComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
