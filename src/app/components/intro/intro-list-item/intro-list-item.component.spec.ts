import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroListItemComponent } from './intro-list-item.component';

describe('IntroListItemComponent', () => {
  let component: IntroListItemComponent;
  let fixture: ComponentFixture<IntroListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
