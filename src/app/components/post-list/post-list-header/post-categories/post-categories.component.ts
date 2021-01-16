import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {OptionModel} from '@scripter/utils/type.util';

const {
  categories,
} = environment;

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss']
})
export class PostCategoriesComponent implements OnInit {
  // categories
  categories: OptionModel<string>[] = [...categories];

  constructor() { }

  ngOnInit(): void {
  }

}
