import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";
import { PlayerRuleRejection } from "src/app/models/rule-rejection/player-rule-rejection.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerRuleRejectionService {

  constructor(private httpClient: HttpClient) { }

  create(roundId: number, playerId: number, rejectedPlayerId: number): Observable<void> {
    return of(null);
//    return this.httpClient.post<void>(`/api/rounds/${roundId}/rules/players`, {
//      player_id: playerId,
//      rejected_player_id: rejectedPlayerId
//    }, httpOptions);
  }

  poll(roundId: number): Observable<PlayerRuleRejection> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/players`, httpOptions);
  }
}
