import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorPreviewerComponent } from './post-editor-previewer.component';

describe('PostEditorPreviewerComponent', () => {
  let component: PostEditorPreviewerComponent;
  let fixture: ComponentFixture<PostEditorPreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditorPreviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
