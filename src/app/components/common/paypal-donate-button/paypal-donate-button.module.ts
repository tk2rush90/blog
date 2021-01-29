import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalDonateButtonComponent } from './paypal-donate-button.component';



@NgModule({
  declarations: [PaypalDonateButtonComponent],
  exports: [
    PaypalDonateButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaypalDonateButtonModule { }
