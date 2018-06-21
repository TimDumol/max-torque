import { TestBed, inject } from '@angular/core/testing';

import { DiscardRuleRejectionService } from './discard-rule-rejection.service';

describe('DiscardRuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscardRuleRejectionService]
    });
  });

  it('should be created', inject([DiscardRuleRejectionService], (service: DiscardRuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
