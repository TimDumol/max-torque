import { TestBed, inject } from '@angular/core/testing';

import { RuleRejectionService } from './rule-rejection.service';

describe('RuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleRejectionService]
    });
  });

  it('should be created', inject([RuleRejectionService], (service: RuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
