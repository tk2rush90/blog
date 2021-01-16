import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-backdrop',
  templateUrl: './modal-backdrop.component.html',
  styleUrls: ['./modal-backdrop.component.scss']
})
export class ModalBackdropComponent implements OnInit {
  // emit when backdrop clicked
  @Output() backdropClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click')
  onHostClicked(): void {
    this.backdropClick.emit();
  }
}
