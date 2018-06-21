import { Component, OnInit } from "@angular/core";
import { Match } from "src/app/models/match/match.model";
import { Observable } from "rxjs/internal/Observable";
import { Player } from "src/app/models/player/player.model";
import { MatchService } from "src/app/models/match/match.service";
import { PlayerService } from "src/app/models/player/player.service";
import { ActivatedRoute, Router } from "@angular/router";
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
import { zip } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { reject } from "q";
import { DiscardRuleRejection } from "src/app/models/rule-rejection/discard-rule-rejection.model";
import { TrumpRuleRejection } from "src/app/models/rule-rejection/trump-rule-rejection.model";
import { SuperTrumpRuleRejection } from "src/app/models/rule-rejection/super-trump-rule-rejection.model";
import { PointsRuleRejection } from "src/app/models/rule-rejection/points-rule-rejection.model";
import { RoundService } from "src/app/models/round/round.service";

@Component({
  selector: "app-nyet-phase-page",
  templateUrl: "./nyet-phase-page.component.html",
  styleUrls: ["./nyet-phase-page.component.scss"]
})
export class NyetPhasePageComponent implements OnInit {
  match$: Observable<Match>;
  me$: Observable<Player>;
  round$: Observable<Round>;
  playersMap: Observable<{[playerId: number]: Player}>;
  playerRuleRejectionsMap: Observable<{[_: number]: Player}>;
  discardRuleRejectionsMap: Observable<{[_: string]: Player}>;
  trumpRuleRejectionsMap: Observable<{[_: string]: Player}>;
  superTrumpRuleRejectionsMap: Observable<{[_: string]: Player}>;
  pointsRuleRejectionsMap: Observable<{[_: number]: Player}>;
  DISCARDS = DISCARDS;
  TRUMPS = TRUMPS;
  SUPER_TRUMPS = SUPER_TRUMPS;

  constructor(
    private matchService: MatchService,
    public playerService: PlayerService,
    private roundService: RoundService,
    private route: ActivatedRoute,
    private router: Router,
    public discardService: DiscardService,
    public trumpService: TrumpService,
    public superTrumpService: SuperTrumpService,
    private playerRuleRejectionService: PlayerRuleRejectionService,
    private trumpRuleRejectionService: TrumpRuleRejectionService,
    private discardRuleRejectionService: DiscardRuleRejectionService,
    private superTrumpRuleRejectionService: SuperTrumpRuleRejectionService,
    private pointsRuleRejectionService: PointsRuleRejectionService
  ) {
  }

  ngOnInit() {
    const matchCode = this.route.snapshot.paramMap.get("code");
    this.match$ = this.matchService.get(matchCode);
    this.me$ = this.playerService.getCurrentPlayer();
    this.round$ = this.roundService.pollCurrentRound(this.route.snapshot.paramMap.get("code"));
    this.round$.subscribe((round) => {
      if (round.first_player_sequence != null && round.discard != null && round.super_trump != null &&
            round.trump != null && round.points != null) {
        this.router.navigateByUrl(`/matches/${matchCode}/tricks`)
      }
    })
  }

  setupRejectionsMaps() {
    this.round$.subscribe((round) => {
      this.playerRuleRejectionsMap = this.playerRuleRejectionService.get(round.id).pipe(
        map((playerRuleRejections: PlayerRuleRejection[]) => {
          let rejectionMap = {};
          playerRuleRejections.forEach((rejection) => {
            rejectionMap[rejection.rejected_player_id] = rejection.id;
          })
          return rejectionMap;
        })
      );
      this.discardRuleRejectionsMap = this.discardRuleRejectionService.get(round.id).pipe(
        map((discardRuleRejections: DiscardRuleRejection[]) => {
          let rejectionMap = {};
          discardRuleRejections.forEach((rejection) => {
            rejectionMap[rejection.discard] = rejection.id;
          })
          return rejectionMap;
        })
      );
      this.trumpRuleRejectionsMap = this.trumpRuleRejectionService.get(round.id).pipe(
        map((trumpRuleRejections: TrumpRuleRejection[]) => {
          let rejectionMap = {};
          trumpRuleRejections.forEach((rejection) => {
            rejectionMap[rejection.trump] = rejection.id;
          })
          return rejectionMap;
        })
      );
      this.superTrumpRuleRejectionsMap = this.superTrumpRuleRejectionService.get(round.id).pipe(
        map((superTrumpRuleRejections: SuperTrumpRuleRejection[]) => {
          let rejectionMap = {};
          superTrumpRuleRejections.forEach((rejection) => {
            rejectionMap[rejection.super_trump] = rejection.id;
          })
          return rejectionMap;
        })
      );
      this.pointsRuleRejectionsMap = this.pointsRuleRejectionService.get(round.id).pipe(
        map((pointsRuleRejections: PointsRuleRejection[]) => {
          let rejectionMap = {};
          pointsRuleRejections.forEach((rejection) => {
            rejectionMap[rejection.points] = rejection.id;
          })
          return rejectionMap;
        })
      );
    })
  }

  rejectPlayer(player: Player) {
    zip(this.me$, this.round$).subscribe(([me, round]) => {
      this.playerRuleRejectionService.create(round.id, me.id, player.id);
    });
  }

  rejectDiscard(discard: Discard) {
    zip(this.me$, this.round$).subscribe(([me, round]) => {
      this.discardRuleRejectionService.create(round.id, me.id, discard);
    });
  }

  rejectTrump(trump: Trump) {
    zip(this.me$, this.round$).subscribe(([me, round]) => {
      this.trumpRuleRejectionService.create(round.id, me.id, trump);
    });
  }

  rejectSuperTrump(superTrump: SuperTrump) {
    zip(this.me$, this.round$).subscribe(([me, round]) => {
      this.superTrumpRuleRejectionService.create(round.id, me.id, superTrump);
    });
  }

  rejectPoints(points: number) {
    zip(this.me$, this.round$).subscribe(([me, round]) => {
      this.pointsRuleRejectionService.create(round.id, me.id, points);
    });
  }
}
