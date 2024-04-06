import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { OiseauComponent } from "./oiseau/oiseau.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "birds", component: OiseauComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }