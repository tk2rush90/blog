import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-label',
  templateUrl: './post-label.component.html',
  styleUrls: ['./post-label.component.scss']
})
export class PostLabelComponent implements OnInit {
  // set deletable state
  @Input() @HostBinding('class.scripter-deletable') deletable = false;

  constructor() { }

  ngOnInit(): void {
  }

}
