import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroListComponent } from './intro-list.component';

describe('IntroListComponent', () => {
  let component: IntroListComponent;
  let fixture: ComponentFixture<IntroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
