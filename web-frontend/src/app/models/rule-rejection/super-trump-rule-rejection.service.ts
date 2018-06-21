import { Injectable } from '@angular/core';
import { Trump } from "src/app/models/trump/trump.model";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { HttpClient } from "@angular/common/http";
import { SuperTrumpRuleRejection } from "src/app/models/rule-rejection/super-trump-rule-rejection.model";
import { SuperTrump } from "src/app/models/super-trump/super-trump.model";

@Injectable({
  providedIn: 'root'
})
export class SuperTrumpRuleRejectionService {

  constructor(private httpClient: HttpClient) { }

  private create(roundId: number, playerId: number, superTrump: SuperTrump): Observable<void> {
    return of(null);
//    return this.httpClient.post<void>(`/api/rounds/${roundId}/rules/super-trumps`, {
//      player_id: playerId,
//      super_trump: super_trump
//    }, httpOptions);
  }

  poll(roundId: number): Observable<SuperTrumpRuleRejection> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/super-trumps`, httpOptions);
  }
}
