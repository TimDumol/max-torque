import { TestBed, inject } from '@angular/core/testing';

import { PointsRuleRejectionService } from './points-rule-rejection.service';

describe('PointsRuleRejectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointsRuleRejectionService]
    });
  });

  it('should be created', inject([PointsRuleRejectionService], (service: PointsRuleRejectionService) => {
    expect(service).toBeTruthy();
  }));
});
