import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorTextareaComponent } from './post-editor-textarea.component';

describe('PostEditorTextareaComponent', () => {
  let component: PostEditorTextareaComponent;
  let fixture: ComponentFixture<PostEditorTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditorTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
