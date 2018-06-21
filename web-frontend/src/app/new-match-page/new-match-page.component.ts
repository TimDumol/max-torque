import { Component, OnInit } from "@angular/core";
import { MatchService } from "src/app/models/match/match.service";
import { Match } from "src/app/models/match/match.model";
import { Location } from "@angular/common";
import { PlayerService } from "src/app/models/player/player.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-match-page",
  templateUrl: "./new-match-page.component.html",
  styleUrls: ["./new-match-page.component.css"]
})
export class NewMatchPageComponent implements OnInit {
  numberOfRounds: number;
  name: string;

  constructor(
    private matchService: MatchService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.startMatch(f.value.numberOfRounds, f.value.name);
  }

  startMatch(numberOfRounds: number, name: string) {
    console.log("I have been clicked");
    this.matchService.create(numberOfRounds).subscribe(match => {
      console.log("yay", match);
      this.matchService
        .join(match.code, name)
        .subscribe(({ match, player }) => {
          console.log("yay yay", match, player);
          this.playerService.setCurrentPlayer(player).subscribe(() => {
            console.log("woot");
            this.router.navigateByUrl(`/matches/${match.code}`);
          });
        });
    });
  }
}
