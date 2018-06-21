import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TricksPhasePageComponent } from "./tricks-phase-page.component";

describe("TricksPhasePageComponent", () => {
  let component: TricksPhasePageComponent;
  let fixture: ComponentFixture<TricksPhasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TricksPhasePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TricksPhasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
