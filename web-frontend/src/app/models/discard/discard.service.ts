import { Injectable } from "@angular/core";
import { Discard } from "src/app/models/discard/discard.model";

@Injectable({
  providedIn: "root"
})
export class DiscardService {
  constructor() {}

  htmlFor(discard: Discard): string {
    switch (discard) {
      case Discard.One:
        return "One";
      case Discard.Two:
        return "Two";
      case Discard.OneExceptOne:
        return "One Except 1";
      case Discard.PassLeft:
        return "Pass Left";
      case Discard.None:
        return "None";
    }
  }
}
