import { TestBed } from '@angular/core/testing';

import { GetPOService } from './getpo.service';

describe('GetPOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPOService = TestBed.get(GetPOService);
    expect(service).toBeTruthy();
  });
});
