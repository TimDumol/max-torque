import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewMatchPageComponent } from "./new-match-page.component";

describe("NewMatchPageComponent", () => {
  let component: NewMatchPageComponent;
  let fixture: ComponentFixture<NewMatchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewMatchPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
