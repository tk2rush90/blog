import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCancelComponent } from './icon-cancel.component';

describe('IconCancelComponent', () => {
  let component: IconCancelComponent;
  let fixture: ComponentFixture<IconCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
