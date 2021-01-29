import { TestBed } from '@angular/core/testing';

import { IntroApiService } from './intro-api.service';

describe('IntroApiService', () => {
  let service: IntroApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
