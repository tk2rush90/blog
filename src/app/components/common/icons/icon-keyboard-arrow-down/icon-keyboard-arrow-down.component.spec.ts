import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconKeyboardArrowDownComponent } from './icon-keyboard-arrow-down.component';

describe('IconKeyboardArrowDownComponent', () => {
  let component: IconKeyboardArrowDownComponent;
  let fixture: ComponentFixture<IconKeyboardArrowDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconKeyboardArrowDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconKeyboardArrowDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
