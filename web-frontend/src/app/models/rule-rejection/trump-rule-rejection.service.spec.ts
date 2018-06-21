import { TestBed, inject } from '@angular/core/testing';

import { TrumpRuleRejectionService } from './trump-rule-rejection.service';

describe('TrumpRuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrumpRuleRejectionService]
    });
  });

  it('should be created', inject([TrumpRuleRejectionService], (service: TrumpRuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
