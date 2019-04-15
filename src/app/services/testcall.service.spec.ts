import { TestBed } from '@angular/core/testing';

import { TestcallService } from './testcall.service';

describe('TestcallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestcallService = TestBed.get(TestcallService);
    expect(service).toBeTruthy();
  });
});
