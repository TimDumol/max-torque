import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { JoinMatchPageComponent } from "./join-match-page.component";

describe("JoinMatchPageComponent", () => {
  let component: JoinMatchPageComponent;
  let fixture: ComponentFixture<JoinMatchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinMatchPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinMatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
