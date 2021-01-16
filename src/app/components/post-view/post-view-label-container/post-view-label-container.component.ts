import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-view-label-container',
  templateUrl: './post-view-label-container.component.html',
  styleUrls: ['./post-view-label-container.component.scss']
})
export class PostViewLabelContainerComponent implements OnInit {
  // post labels
  @Input() labels: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
