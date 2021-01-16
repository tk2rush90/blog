import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewToggleIconComponent } from './view-toggle-icon.component';

describe('ViewToggleIconComponent', () => {
  let component: ViewToggleIconComponent;
  let fixture: ComponentFixture<ViewToggleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewToggleIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
