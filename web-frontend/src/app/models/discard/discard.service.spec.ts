import { TestBed, inject } from "@angular/core/testing";

import { DiscardService } from "./discard.service";

describe("DiscardService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscardService]
    });
  });

  it("should be created", inject(
    [DiscardService],
    (service: DiscardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
