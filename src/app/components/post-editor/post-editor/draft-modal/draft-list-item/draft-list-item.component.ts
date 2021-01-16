import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-draft-list-item',
  templateUrl: './draft-list-item.component.html',
  styleUrls: ['./draft-list-item.component.scss']
})
export class DraftListItemComponent implements OnInit {
  // post model
  @Input() post: PostModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
