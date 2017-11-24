import { NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {TrajetsComponent} from "./trajets/trajets.component";
import {MembresComponent} from "./membres/membres.component";
import {TrajetsService} from "./trajets/trajets.service";

const routes: Routes = [
  {
    path: 'trajets/',
    component: TrajetsComponent
  },
  {
    path: 'membres/',
    component: MembresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TrajetsService] // ajouter le service trajets ?
})

export class AppRoutingModule {}
