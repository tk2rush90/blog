import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolOptionItemComponent } from './tool-option-item.component';

describe('ToolOptionItemComponent', () => {
  let component: ToolOptionItemComponent;
  let fixture: ComponentFixture<ToolOptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolOptionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
