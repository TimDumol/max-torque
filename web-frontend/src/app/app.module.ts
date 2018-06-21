import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from ".//app-routing.module";
import { HighScoresComponent } from "./high-scores/high-scores.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, HighScoresComponent],
  imports: [BrowserModule, AppRoutingModule, NgxsModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
