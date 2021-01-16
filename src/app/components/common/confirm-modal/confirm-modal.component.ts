import {Component, Inject, OnInit} from '@angular/core';
import {MODAL_DATA, MODAL_REF, ModalRef} from '@scripter/components/common/modal/models/modal-ref';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    @Inject(MODAL_DATA) public message: string,
    @Inject(MODAL_REF) public modalRef: ModalRef<ConfirmModalComponent>,
  ) { }

  ngOnInit(): void {
  }

}
