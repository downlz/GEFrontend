import { TestBed } from '@angular/core/testing';

import { UploadBillService } from './uploadbill.service';

describe('UploadBillServicevice', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadBillService = TestBed.get(UploadBillService);
    expect(service).toBeTruthy();
  });
});
