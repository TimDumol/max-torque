import { Injectable } from "@angular/core";
import { Player } from "src/app/models/player/player.model";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  public COLORS = [
    '#4a90e2',
    '#9013fe',
    '#417505',
    '#000000',
    '#8b572a'
  ];

  constructor() {}

  setCurrentPlayer(player: Player): Observable<void> {
    localStorage.setItem("currentPlayer", JSON.stringify(player));
    console.log("lul");
    return of(null);
  }

  getCurrentPlayer(): Observable<Player> {
    let currentPlayer = localStorage.getItem("currentPlayer");
    if (currentPlayer) {
      return of(JSON.parse(currentPlayer));
    } else {
      return of(null);
    }
  }

  getColorCode(player: Player): string {
    return this.COLORS[player.sequence-1];
  }
}
