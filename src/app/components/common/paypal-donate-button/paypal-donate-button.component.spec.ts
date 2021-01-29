import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalDonateButtonComponent } from './paypal-donate-button.component';

describe('PaypalDonateButtonComponent', () => {
  let component: PaypalDonateButtonComponent;
  let fixture: ComponentFixture<PaypalDonateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalDonateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalDonateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
