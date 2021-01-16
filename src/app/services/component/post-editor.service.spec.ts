import { TestBed } from '@angular/core/testing';

import { PostEditorService } from './post-editor.service';

describe('PostEditorService', () => {
  let service: PostEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
