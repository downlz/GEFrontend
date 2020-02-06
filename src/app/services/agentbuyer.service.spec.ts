import { TestBed } from '@angular/core/testing';

import { AgentBuyerService } from './agentbuyer.service';

describe('AgentBuyerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentBuyerService = TestBed.get(AgentBuyerService);
    expect(service).toBeTruthy();
  });
});
