import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NyetPhasePageComponent } from "./nyet-phase-page.component";

describe("NyetPhasePageComponent", () => {
  let component: NyetPhasePageComponent;
  let fixture: ComponentFixture<NyetPhasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NyetPhasePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyetPhasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
