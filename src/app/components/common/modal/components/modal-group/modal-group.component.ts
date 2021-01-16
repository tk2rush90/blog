import {Component, HostBinding, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {randomKey} from '@scripter/utils/random.util';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.scss'],
  animations: [
    trigger('fading', [
      state('void', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('void <=> show', animate('.12s ease-out')),
    ]),
  ]
})
export class ModalGroupComponent implements OnInit {
  // view container ref
  @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | undefined;
  // bind fading animation
  @HostBinding('@fading') fadingAnimation = 'show';
  // modal group id
  id = randomKey();

  constructor() { }

  ngOnInit(): void {
  }
}
