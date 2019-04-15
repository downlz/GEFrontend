import { TestBed } from '@angular/core/testing';

import { OrderService } from './groupbuying.service';

describe('GroupBuyingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupBuyingService = TestBed.get(GroupBuyingService);
    expect(service).toBeTruthy();
  });
});
