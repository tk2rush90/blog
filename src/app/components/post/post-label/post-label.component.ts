import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-label',
  templateUrl: './post-label.component.html',
  styleUrls: ['./post-label.component.scss']
})
export class PostLabelComponent implements OnInit {
  // activated state
  // set `true` when user is searching this label
  @Input() @HostBinding('class.scripter-activated') activated = false;
  // set deletable state
  @Input() @HostBinding('class.scripter-deletable') deletable = false;

  constructor() { }

  ngOnInit(): void {
  }

}
