import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PreMatchPageComponent } from "./pre-match-page.component";

describe("PreMatchPageComponent", () => {
  let component: PreMatchPageComponent;
  let fixture: ComponentFixture<PreMatchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreMatchPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
