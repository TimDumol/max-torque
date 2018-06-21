import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { of } from "rxjs/internal/observable/of";
import { Observable } from "rxjs/internal/Observable";
import { PlayerRuleRejection } from "src/app/models/rule-rejection/player-rule-rejection.model";
import { PointsRuleRejection } from "src/app/models/rule-rejection/points-rule-rejection.model";

@Injectable({
  providedIn: 'root'
})
export class PointsRuleRejectionService {

  constructor(private httpClient: HttpClient) { }

  create(roundId: number, playerId: number, points: number): Observable<void> {
    return of(null);
//    return this.httpClient.post<void>(`/api/rounds/${roundId}/rules/players`, {
//      player_id: playerId,
//      points: points
//    }, httpOptions);
  }
  get(roundId: number): Observable<PointsRuleRejection[]> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/points`, httpOptions);
  }

  poll(roundId: number): Observable<PointsRuleRejection[]> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/points`, httpOptions);
  }
}
