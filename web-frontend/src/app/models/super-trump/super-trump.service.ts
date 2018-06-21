import { Injectable } from "@angular/core";
import { SuperTrump } from "src/app/models/super-trump/super-trump.model";

@Injectable({
  providedIn: "root"
})
export class SuperTrumpService {
  constructor() {}

  fgClassFor(superTrump: SuperTrump): string {
    switch (superTrump) {
      case SuperTrump.Red:
        return "suits-red-fg";
      case SuperTrump.Blue:
        return "suits-blue-fg";
      case SuperTrump.Green:
        return "suits-green-fg";
      case SuperTrump.Yellow:
        return "suits-yellow-fg";
      case SuperTrump.None:
        return "";
    }
  }

  htmlFor(superTrump: SuperTrump): string {
    switch (superTrump) {
      case SuperTrump.Red:
        return "R";
      case SuperTrump.Blue:
        return "B";
      case SuperTrump.Green:
        return "G";
      case SuperTrump.Yellow:
        return "Y";
      case SuperTrump.None:
        return "None";
    }
  }

  deserialize(trump: string): SuperTrump {
    return <SuperTrump>trump;
  }
}
