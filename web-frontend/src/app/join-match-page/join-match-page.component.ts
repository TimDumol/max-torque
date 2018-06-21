import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatchService } from "src/app/models/match/match.service";
import { PlayerService } from "src/app/models/player/player.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-join-match-page",
  templateUrl: "./join-match-page.component.html",
  styleUrls: ["./join-match-page.component.css"]
})
export class JoinMatchPageComponent implements OnInit {
  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.joinMatch(f.value.matchCode, f.value.name);
  }

  joinMatch(matchCode: string, name: string) {
    this.matchService.join(matchCode, name).subscribe(({ match, player }) => {
      this.playerService.setCurrentPlayer(player).subscribe(() => {
        this.router.navigateByUrl(`/matches/${match.code}`);
      });
    });
  }
}
