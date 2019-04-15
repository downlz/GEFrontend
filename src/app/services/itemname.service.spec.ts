import { TestBed } from '@angular/core/testing';

import { ItemnameService } from './itemname.service';

describe('ItemnameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemnameService = TestBed.get(ItemnameService);
    expect(service).toBeTruthy();
  });
});
