import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBaseComponent } from './intro-base.component';

describe('IntroBaseComponent', () => {
  let component: IntroBaseComponent;
  let fixture: ComponentFixture<IntroBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
