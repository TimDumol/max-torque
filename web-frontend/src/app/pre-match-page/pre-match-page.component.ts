import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Match } from "src/app/models/match/match.model";
import { Player } from "src/app/models/player/player.model";
import { PlayerService } from "src/app/models/player/player.service";
import { MatchService } from "src/app/models/match/match.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pre-match-page",
  templateUrl: "./pre-match-page.component.html",
  styleUrls: ["./pre-match-page.component.css"]
})
export class PreMatchPageComponent implements OnInit {
  match$: Observable<Match>;
  me$: Observable<Player>;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.match$ = this.matchService.get(
      this.route.snapshot.paramMap.get("code")
    );
    this.me$ = this.playerService.getCurrentPlayer();
  }
}
