import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'trajets',
    // component: TrajetsComponent,
    loadChildren: './trajets/trajets.module#TrajetsModule'
  },
  {
    path: 'membres',
    // component: MembresComponent,
    // loadChildren: MembresComponent
    loadChildren: './membres/membres.module#MembresModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
