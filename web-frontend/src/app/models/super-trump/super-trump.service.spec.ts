import { TestBed, inject } from "@angular/core/testing";

import { SuperTrumpService } from "./super-trump.service";

describe("SuperTrumpService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperTrumpService]
    });
  });

  it("should be created", inject(
    [SuperTrumpService],
    (service: SuperTrumpService) => {
      expect(service).toBeTruthy();
    }
  ));
});
