/// <reference types="@types/googlemaps" />
import {Component, NgZone, OnInit} from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {ActivatedRoute} from '@angular/router';
import {MembresService} from '../../membres/membres.service';
import {MapsAPILoader} from '@agm/core';
import {CookieService} from 'ngx-cookie-service';
// import {} from 'googlemaps';
// import {} from '@types/googlemaps';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trajet: any = {driverData: {}};
  loading = false;

  // mapOptions: any = {};
  google: any = {};
  archived = false;
  hasProposed = false;
  hadReserved = false;
  complet  = false;
  tripID = '';

  driverRating = 4;
  driverRated = false;

  zoom = 9;
  latitude = 43.610769; // coordonnées de Montpellier par défaut
  longitude = 3.876716;

  directions = undefined; // Map directions (itineraire)

  constructor(
    private route: ActivatedRoute,
    private trajetsService: TrajetsService,
    private membresService: MembresService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cs: CookieService
  ) {}



  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.tripID = routeParams.tripID;

      this.trajetsService.getTripDetails(this.tripID).subscribe(trip => {
        if (trip && trip[0] && trip[0].driverData) {
          const dat = new Date();
          this.trajet = trip[0];
          const trajetDate = new Date(this.trajet.date);
          this.archived = (dat >= trajetDate);
          this.hasProposed = this.cs.get('_id') === this.trajet.conducteur;
          this.complet = this.trajet.complet === 'true';

          console.log('Trajet chargé : ');
          console.log(this.trajet);

          // this.directions = this.trajet.directions;
          this.loadMapsAPILoader();


        }
        this.loading = false;
      });

      this.checkHadReserved();

    });
  }

  isAdmin(): boolean {
    return this.cs.get('isAdmin') === 'true';
  }


  /**
   * Fonction de debug admin only : force le changement de date
   */
  updateDate() {
    if (this.trajet.date === '')  {
      return;
    }
    this.trajetsService.updateDate(this.tripID, this.trajet.date).subscribe(res => {
      /// rien a faire
    });
  }

  addResa() {
    this.trajetsService.addResa(this.tripID, this.cs.get('_id')).subscribe(res => {
      this.hadReserved = true;
      this.trajet.placesRestantes--;
    });
  }

  cancelResa() {
    this.trajetsService.cancelResa(this.tripID, this.cs.get('_id')).subscribe(res => {
      this.hadReserved = false;
      this.trajet.placesRestantes++;
    });
  }

  loadDriverRating() {
    // driverRating: number;
    this.membresService.getRating(this.cs.get('_id'), this.trajet.conducteur, this.tripID).subscribe(res => {
      this.driverRating = res.rating;
      this.driverRated = res.rating !== '';
      console.log('loadDriverRating = ');
      console.log(res);
      console.log('driver Rated : ', this.driverRated);
    });
  }

  setDriverRating() {

    if (this.driverRating < 1 || this.tripID === '') {
      return;
    }

    this.membresService.setRating(this.cs.get('_id'), this.trajet.conducteur, this.tripID, this.driverRating).subscribe(res => {
      this.driverRated = true;
    });
  }

  checkHadReserved() {
    this.trajetsService.getMesReservations(this.cs.get('_id')).subscribe(res => {
      for (const resa of res) {
        if (resa._id === this.tripID) {
          this.hadReserved = true;
          break;
        }
      }

      if (this.hadReserved && this.archived) {
        this.loadDriverRating();
      }

    });
  }

  private loadMapsAPILoader() {
    this.mapsAPILoader.load().then(() => {
      this.ngZone.run(() => {
        this.directions = this.trajet.directions;



      });

    });
  }


}
