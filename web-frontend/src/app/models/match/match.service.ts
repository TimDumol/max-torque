import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Match } from "src/app/models/match/match.model";
import { Player } from "src/app/models/player/player.model";
import { of } from "rxjs/internal/observable/of";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class MatchService {
  matchesUrl = "/api/matches";

  constructor(private http: HttpClient) {}

  create(numberOfRounds: number): Observable<Match> {
    return of({
      id: 1,
      code: "ABCDEF",
      number_of_rounds: numberOfRounds,
      created_at: new Date()
    });
    //return this.http.post<Match>(this.matchesUrl, {number_of_rounds: numberOfRounds}, httpOptions);
  }

  join(
    code: string,
    name: string
  ): Observable<{ match: Match; player: Player }> {
    return of({
      match: {
        id: 1,
        code: "ABCDEF",
        number_of_rounds: 4,
        created_at: new Date(),
        players: [
          {
            id: 1,
            match_id: 1,
            is_match_maker: true,
            name: "Tim",
            sequence: 1,
            created_at: new Date()
          },
          {
            id: 2,
            is_match_maker: false,
            match_id: 1,
            name: "James",
            sequence: 2,
            created_at: new Date()
          }
        ]
      },
      player: {
        id: 1,
        is_match_maker: true,
        match_id: 1,
        name: "Tim",
        sequence: 1,
        created_at: new Date()
      }
    });
    //return this.http.put<{match: Match, player: Player}>(`${this.matchesUrl}/${code}/join`, {name}, httpOptions);
  }

  get(code: string): Observable<Match> {
    return of({
      id: 1,
      code: "ABCDEF",
      number_of_rounds: 4,
      created_at: new Date(),
      players: [
        {
          id: 1,
          match_id: 1,
          is_match_maker: true,
          name: "Tim",
          sequence: 1,
          created_at: new Date()
        },
        {
          id: 2,
          is_match_maker: false,
          match_id: 1,
          name: "James",
          sequence: 2,
          created_at: new Date()
        }
      ]
    });
    //return this.http.get<Match>(`${this.matchesUrl}/${code}`, httpOptions);
  }
}
