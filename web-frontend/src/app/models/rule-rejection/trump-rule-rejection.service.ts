import { Injectable } from '@angular/core';
import { TrumpRuleRejection } from "src/app/models/rule-rejection/trump-rule-rejection.model";
import { of } from "rxjs/internal/observable/of";
import { HttpClient } from "@angular/common/http";
import { Trump } from "src/app/models/trump/trump.model";

@Injectable({
  providedIn: 'root'
})
export class TrumpRuleRejectionService {

  constructor(private httpClient: HttpClient) { }

  private create(roundId: number, playerId: number, trump: Trump): Observable<void> {
    return of(null);
//    return this.httpClient.post<void>(`/api/rounds/${roundId}/rules/trumps`, {
//      player_id: playerId,
//      trump: trump
//    }, httpOptions);
  }

  poll(roundId: number): Observable<TrumpRuleRejection> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/trumps`, httpOptions);
  }
}
