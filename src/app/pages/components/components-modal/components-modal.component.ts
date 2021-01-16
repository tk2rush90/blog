import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalService} from '@scripter/components/common/modal/services/modal.service';
import {TestModalComponent} from '@scripter/pages/components/components-modal/test-modal/test-modal.component';

@Component({
  selector: 'app-components-modal',
  templateUrl: './components-modal.component.html',
  styleUrls: ['./components-modal.component.scss']
})
export class ComponentsModalComponent implements OnInit, AfterViewInit {

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalService.open(TestModalComponent, {
      closeOnNavigating: true,
    });
  }
}
