import { TestBed } from '@angular/core/testing';

import { GetInvoiceService } from './getinvoice.service';

describe('GetInvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInvoiceService = TestBed.get(GetInvoiceService);
    expect(service).toBeTruthy();
  });
});
