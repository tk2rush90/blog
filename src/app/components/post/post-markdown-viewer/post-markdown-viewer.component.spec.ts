import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMarkdownViewerComponent } from './post-markdown-viewer.component';

describe('PostMarkdownViewerComponent', () => {
  let component: PostMarkdownViewerComponent;
  let fixture: ComponentFixture<PostMarkdownViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMarkdownViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMarkdownViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
