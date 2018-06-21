import { Injectable } from '@angular/core';
import { Discard } from "src/app/models/discard/discard.model";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DiscardRuleRejection } from "src/app/models/rule-rejection/discard-rule-rejection.model";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DiscardRuleRejectionService {
  constructor(private httpClient: HttpClient) { }

  create(roundId: number, playerId: number, discard: Discard): Observable<void> {
    return of(null);
//    return this.httpClient.post<void>(`/api/rounds/${roundId}/rules/discards`, {
//      player_id: playerId,
//      discard: discard
//    }, httpOptions);
  }
  get(roundId: number): Observable<DiscardRuleRejection[]> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/discards`, httpOptions);
  }

  poll(roundId: number): Observable<DiscardRuleRejection[]> {
    return of(null);
//    return this.httpClient.get<DiscardRuleRejection>(`/api/rounds/${roundId}/rules/discards`, httpOptions);
  }
}
