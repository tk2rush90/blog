import { TestBed } from '@angular/core/testing';

import { DevGuard } from './dev.guard';

describe('DevGuard', () => {
  let guard: DevGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
