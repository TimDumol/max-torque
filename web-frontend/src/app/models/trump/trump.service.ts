import { Injectable } from "@angular/core";
import { Trump } from "src/app/models/trump/trump.model";

@Injectable({
  providedIn: "root"
})
export class TrumpService {
  constructor() {}

  fgClassFor(trump: Trump): string {
    switch (trump) {
      case Trump.Red:
        return "suits-red-fg";
      case Trump.Blue:
        return "suits-blue-fg";
      case Trump.Green:
        return "suits-green-fg";
      case Trump.Yellow:
        return "suits-yellow-fg";
    }
  }

  htmlFor(trump: Trump): string {
    switch (trump) {
      case Trump.Red:
        return "R";
      case Trump.Blue:
        return "B";
      case Trump.Green:
        return "G";
      case Trump.Yellow:
        return "Y";
    }
  }

  deserialize(trump: string): Trump {
    return <Trump>trump;
  }
}
