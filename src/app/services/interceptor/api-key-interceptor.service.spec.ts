import { TestBed } from '@angular/core/testing';

import { ApiKeyInterceptorService } from './api-key-interceptor.service';

describe('ApiKeyInterceptorService', () => {
  let service: ApiKeyInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKeyInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
