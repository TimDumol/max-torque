import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { NewMatchPageComponent } from "src/app/new-match-page/new-match-page.component";
import { JoinMatchPageComponent } from "src/app/join-match-page/join-match-page.component";
import { PreMatchPageComponent } from "src/app/pre-match-page/pre-match-page.component";
import { NyetPhasePageComponent } from "src/app/nyet-phase-page/nyet-phase-page.component";
import { TricksPhasePageComponent } from "src/app/tricks-phase-page/tricks-phase-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "matches/new", pathMatch: "full", component: NewMatchPageComponent },
  {
    path: "matches/join",
    pathMatch: "full",
    component: JoinMatchPageComponent
  },
  {
    path: "matches/:code",
    pathMatch: "full",
    component: PreMatchPageComponent
  },
  {
    path: "matches/:code/nyet",
    pathMatch: "full",
    component: NyetPhasePageComponent
  },
  {
    path: "matches/:code/tricks",
    pathMatch: "full",
    component: TricksPhasePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
