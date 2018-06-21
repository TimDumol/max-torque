import { TestBed, inject } from "@angular/core/testing";

import { TrumpService } from "./trump.service";

describe("TrumpService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrumpService]
    });
  });

  it("should be created", inject([TrumpService], (service: TrumpService) => {
    expect(service).toBeTruthy();
  }));
});
