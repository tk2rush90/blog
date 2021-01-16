import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPostEditorComponent } from './components-post-editor.component';

describe('ComponentsPostEditorComponent', () => {
  let component: ComponentsPostEditorComponent;
  let fixture: ComponentFixture<ComponentsPostEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsPostEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPostEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
