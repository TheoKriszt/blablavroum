import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrajetsService} from "./trajets.service";
import {TrajetsComponent} from "./trajets.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {TrajetsRechercheComponent} from './trajets-recherche/trajets-recherche.component';
import {FormsModule} from "@angular/forms";
import { TripProposalComponent } from './trip-proposal/trip-proposal.component';
import { ProposedTripsComponent } from './proposed-trips/proposed-trips.component';
import {AuthGuard} from "../guards/auth-guard";
import {CalendarModule, DropdownModule, SliderModule} from "primeng/primeng";
import { ReservationsComponent } from './reservations/reservations.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';


const routes: Routes = [
  {
    path: 'trajets-recherche/:villeDepart/:villeArrivee/:dateDepart',
    component: TrajetsRechercheComponent
  },
  {
    path: 'trajets-recherche/:villeDepart/:villeArrivee',
    component: TrajetsRechercheComponent
  },
  {
    path: 'trip-proposal',
    component: TripProposalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trip-details/:tripID',
    component: TripDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule, HttpClientModule, FormsModule ,RouterModule.forChild(routes), CalendarModule, DropdownModule, SliderModule
  ],
  exports:[TrajetsComponent, TrajetsRechercheComponent,  RouterModule, TripProposalComponent, ProposedTripsComponent], // exports pour utilisation dans un autre module (membres dashboard)
  declarations: [TrajetsComponent, TrajetsRechercheComponent, TripProposalComponent, ProposedTripsComponent, ReservationsComponent, TripDetailsComponent],
  providers: [TrajetsService, AuthGuard]
})
export class TrajetsModule { }
