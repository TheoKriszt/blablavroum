import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrajetsService} from "./trajets.service";
import {TrajetsComponent} from "./trajets.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {TrajetsRechercheComponent} from './trajets-recherche/trajets-recherche.component';
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: 'trajets-recherche/:villeDepart/:villeArrivee/:dateDepart',
    component: TrajetsRechercheComponent
  },
  {
    path: 'trajets-recherche/:villeDepart/:villeArrivee',
    component: TrajetsRechercheComponent
  },
];

@NgModule({
  imports: [
    CommonModule, HttpClientModule, FormsModule ,RouterModule.forChild(routes)
  ],
  exports:[TrajetsComponent, TrajetsRechercheComponent,  RouterModule], // elements que le module altère ou ajoute
  declarations: [TrajetsComponent, TrajetsRechercheComponent],
  providers: [TrajetsService]
})
export class TrajetsModule { }
