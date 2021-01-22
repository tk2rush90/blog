import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheckerComponent } from './update-checker.component';

describe('UpdateCheckerComponent', () => {
  let component: UpdateCheckerComponent;
  let fixture: ComponentFixture<UpdateCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
