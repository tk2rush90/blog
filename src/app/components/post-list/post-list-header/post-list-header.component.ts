import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-list-header',
  templateUrl: './post-list-header.component.html',
  styleUrls: ['./post-list-header.component.scss']
})
export class PostListHeaderComponent implements OnInit {
  // hidden flag for categories
  @Input() hideCategories = false;

  constructor() { }

  ngOnInit(): void {
  }

}
