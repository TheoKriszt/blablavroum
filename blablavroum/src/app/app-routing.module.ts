import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrajetsComponent} from "./trajets/trajets.component";
import {MembresComponent} from "./membres/membres.component";

const routes: Routes = [
  {
    path: 'trajets',
    component: TrajetsComponent
  },
  {
    path: 'membres',
    component: MembresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
