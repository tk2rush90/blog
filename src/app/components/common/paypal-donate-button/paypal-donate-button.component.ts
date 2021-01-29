import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

const {
  paypalLink,
} = environment;

@Component({
  selector: 'app-paypal-donate-button',
  templateUrl: './paypal-donate-button.component.html',
  styleUrls: ['./paypal-donate-button.component.scss']
})
export class PaypalDonateButtonComponent implements OnInit {
  // paypal link
  link: string = paypalLink;

  constructor() { }

  ngOnInit(): void {
  }

}
