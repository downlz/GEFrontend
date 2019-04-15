import { TestBed } from '@angular/core/testing';

import { TestitemService } from './testitem.service';

describe('TestitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestitemService = TestBed.get(TestitemService);
    expect(service).toBeTruthy();
  });
});
