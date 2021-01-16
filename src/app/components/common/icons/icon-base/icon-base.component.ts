import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-base',
  template: '',
})
export class IconBaseComponent implements OnInit {
  // set icon base class
  @HostBinding('class.scripter-icon') baseClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
