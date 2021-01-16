import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorViewToggleComponent } from './editor-view-toggle.component';

describe('EditorViewToggleComponent', () => {
  let component: EditorViewToggleComponent;
  let fixture: ComponentFixture<EditorViewToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorViewToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorViewToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
