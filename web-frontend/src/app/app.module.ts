import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from ".//app-routing.module";
import { HighScoresComponent } from "./high-scores/high-scores.component";
import { NewMatchPageComponent } from "./new-match-page/new-match-page.component";
import { JoinMatchPageComponent } from "./join-match-page/join-match-page.component";
import { PreMatchPageComponent } from "./pre-match-page/pre-match-page.component";
import { HttpClientModule } from "@angular/common/http";
import { NyetPhasePageComponent } from "./nyet-phase-page/nyet-phase-page.component";
import { TricksPhasePageComponent } from "./tricks-phase-page/tricks-phase-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HighScoresComponent,
    NewMatchPageComponent,
    JoinMatchPageComponent,
    PreMatchPageComponent,
    NyetPhasePageComponent,
    TricksPhasePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
