import { TestBed } from '@angular/core/testing';

import { PurchaseOrderService } from './purchaseorder.service';

describe('PurchaseOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseOrderService = TestBed.get(PurchaseOrderService);
    expect(service).toBeTruthy();
  });
});
