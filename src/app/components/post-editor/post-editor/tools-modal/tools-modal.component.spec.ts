import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsModalComponent } from './tools-modal.component';

describe('ToolsModalComponent', () => {
  let component: ToolsModalComponent;
  let fixture: ComponentFixture<ToolsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
