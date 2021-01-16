import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorHeaderComponent } from './post-editor-header.component';

describe('PostEditorHeaderComponent', () => {
  let component: PostEditorHeaderComponent;
  let fixture: ComponentFixture<PostEditorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEditorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
