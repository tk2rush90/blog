import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intro2020WinterComponent } from './intro-2020-winter.component';

describe('AnimationServiceComponent', () => {
  let component: Intro2020WinterComponent;
  let fixture: ComponentFixture<Intro2020WinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Intro2020WinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Intro2020WinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
