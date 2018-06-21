import { Component, OnInit } from "@angular/core";
import { Match } from "src/app/models/match/match.model";
import { Observable } from "rxjs/internal/Observable";
import { Player } from "src/app/models/player/player.model";
import { MatchService } from "src/app/models/match/match.service";
import { PlayerService } from "src/app/models/player/player.service";
import { ActivatedRoute } from "@angular/router";
import { DiscardService } from "src/app/models/discard/discard.service";
import { Discard, DISCARDS } from "src/app/models/discard/discard.model";
import { TrumpService } from "src/app/models/trump/trump.service";
import { Trump, TRUMPS } from "src/app/models/trump/trump.model";
import {
  SUPER_TRUMPS,
  SuperTrump
} from "src/app/models/super-trump/super-trump.model";
import { SuperTrumpService } from "src/app/models/super-trump/super-trump.service";
import { PlayerRuleRejection } from "src/app/models/rule-rejection/player-rule-rejection.model";
import { PlayerRuleRejectionService } from "src/app/models/rule-rejection/player-rule-rejection.service";
import { TrumpRuleRejectionService } from "src/app/models/rule-rejection/trump-rule-rejection.service";
import { DiscardRuleRejectionService } from "src/app/models/rule-rejection/discard-rule-rejection.service";
import { SuperTrumpRuleRejectionService } from "src/app/models/rule-rejection/super-trump-rule-rejection.service";
import { PointsRuleRejectionService } from "src/app/models/rule-rejection/points-rule-rejection.service";
import { Round } from "src/app/models/round/round.model";

@Component({
  selector: "app-nyet-phase-page",
  templateUrl: "./nyet-phase-page.component.html",
  styleUrls: ["./nyet-phase-page.component.scss"]
})
export class NyetPhasePageComponent implements OnInit {
  match$: Observable<Match>;
  me$: Observable<Player>;
  round$: Observable<Round>;
  DISCARDS = DISCARDS;
  TRUMPS = TRUMPS;
  SUPER_TRUMPS = SUPER_TRUMPS;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    public discardService: DiscardService,
    public trumpService: TrumpService,
    public superTrumpService: SuperTrumpService,
    private playerRuleRejectionService: PlayerRuleRejectionService,
    private trumpRuleRejectionService: TrumpRuleRejectionService,
    private discardRuleRejectionService: DiscardRuleRejectionService,
    private superTrumpRuleRejectionService: SuperTrumpRuleRejectionService,
    private pointsRuleRejectionService: PointsRuleRejectionService
  ) {}

  ngOnInit() {
    this.match$ = this.matchService.poll(
      this.route.snapshot.paramMap.get("code")
    );
    this.me$ = this.playerService.getCurrentPlayer();
  }

  rejectPlayer(player: Player) {
  }

  rejectDiscard(discard: Discard) {}

  rejectTrump(trump: Trump) {}

  rejectSuperStrump(superTrump: SuperTrump) {}

  rejectPoints(points: number) {}
}
