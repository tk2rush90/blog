import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intro2020WinterPageComponent } from './intro-2020-winter-page.component';

describe('IntroWinterPageComponent', () => {
  let component: Intro2020WinterPageComponent;
  let fixture: ComponentFixture<Intro2020WinterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Intro2020WinterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Intro2020WinterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
