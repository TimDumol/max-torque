import { TestBed, inject } from '@angular/core/testing';

import { SuperTrumpRuleRejectionService } from './super-trump-rule-rejection.service';

describe('SuperTrumpRuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperTrumpRuleRejectionService]
    });
  });

  it('should be created', inject([SuperTrumpRuleRejectionService], (service: SuperTrumpRuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
