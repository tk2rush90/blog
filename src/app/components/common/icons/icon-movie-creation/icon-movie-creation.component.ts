import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '@scripter/components/common/icons/icon-base/icon-base.component';

@Component({
  selector: 'app-icon-movie-creation',
  templateUrl: './icon-movie-creation.component.html',
  styleUrls: ['./icon-movie-creation.component.scss']
})
export class IconMovieCreationComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
