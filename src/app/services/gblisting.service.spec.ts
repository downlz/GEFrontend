import { TestBed } from '@angular/core/testing';

import { GBListingService } from './gblisting.service';

describe('GBListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GBListingService = TestBed.get(GBListingService);
    expect(service).toBeTruthy();
  });
});
