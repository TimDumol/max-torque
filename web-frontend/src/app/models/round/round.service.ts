import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Round } from "src/app/models/round/round.model";
import { of } from "rxjs/internal/observable/of";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RoundService {
  constructor(private httpClient: HttpClient) {}

  getCurrentRound(matchCode: string): Observable<Round> {
    return of({
      id: 1,
      match_id: 1,
      sequence: 1,
    });
    //return this.httpClient.get<Round>(`/api/matches/${matchCode}/rounds/latest`);
  }
  pollCurrentRound(matchCode: string): Observable<Round> {
    return of({
      id: 1,
      match_id: 1,
      sequence: 1,
    });
    //return this.httpClient.get<Round>(`/api/matches/${matchCode}/rounds/latest`);
  }
}
