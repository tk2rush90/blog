import {Component, Input, OnInit} from '@angular/core';

export type LoadingSpotColor = 'grey';

@Component({
  selector: 'app-loading-spot',
  templateUrl: './loading-spot.component.html',
  styleUrls: ['./loading-spot.component.scss']
})
export class LoadingSpotComponent implements OnInit {
  // loading ball size
  @Input() size = 30;
  // set loading ball color
  @Input() color: LoadingSpotColor = 'grey';

  constructor() { }

  ngOnInit(): void {
  }

}
