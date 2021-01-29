import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intro2021SpringComponent } from './intro-2021-spring.component';

describe('Intro2021SpringComponent', () => {
  let component: Intro2021SpringComponent;
  let fixture: ComponentFixture<Intro2021SpringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Intro2021SpringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Intro2021SpringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
