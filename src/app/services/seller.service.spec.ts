import { TestBed } from '@angular/core/testing';

import { UsersellerService } from './seller.service';

describe('UsersellerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersellerService = TestBed.get(UsersellerService);
    expect(service).toBeTruthy();
  });
});
