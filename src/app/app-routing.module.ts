import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'trajets',
    loadChildren: './trajets/trajets.module#TrajetsModule'
  },
  {
    path: 'membres',
    loadChildren: './membres/membres.module#MembresModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
