import { TestBed } from '@angular/core/testing';

import { BargainService } from './bargain.service';

describe('BargainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BargainService = TestBed.get(BargainService);
    expect(service).toBeTruthy();
  });
});
