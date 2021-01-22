import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-update-checker',
  templateUrl: './update-checker.component.html',
  styleUrls: ['./update-checker.component.scss']
})
export class UpdateCheckerComponent implements OnInit {
  // emit when confirm button clicked
  @Output() confirmClick: EventEmitter<void> = new EventEmitter<void>();
  // emit when close button clicked
  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
