import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { NewMatchPageComponent } from "src/app/new-match-page/new-match-page.component";
import { JoinMatchPageComponent } from "src/app/join-match-page/join-match-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "matches/new", pathMatch: "full", component: NewMatchPageComponent },
  {
    path: "matches/join",
    pathMatch: "full",
    component: JoinMatchPageComponent
  },
  { path: "matches/:id" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
