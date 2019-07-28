import { TestBed } from '@angular/core/testing';

import { TransportRateService } from './transportrate.service';

describe('TransportRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportRateService = TestBed.get(TransportRateService);
    expect(service).toBeTruthy();
  });
});
