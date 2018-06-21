import { TestBed, inject } from '@angular/core/testing';

import { PlayerRuleRejectionService } from './player-rule-rejection.service';

describe('PlayerRuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerRuleRejectionService]
    });
  });

  it('should be created', inject([PlayerRuleRejectionService], (service: PlayerRuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
