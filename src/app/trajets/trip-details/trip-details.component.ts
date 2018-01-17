import {Component, OnInit} from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {ActivatedRoute} from '@angular/router';
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) {
  }

  trajet: any = {};
  // driver: Object = {};
  loading = true;

  mapOptions: any = {};
  google: any = {};
  archived = false;
  hasProposed = false;
  hadReserved = false;
  complet  = false;
  newDate = '';
  tripID = '';

  ngOnInit() {



    this.mapOptions = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    this.route.params.subscribe(routeParams => {
      this.tripID = routeParams.tripID;

      this.trajetsService.getTripDetails(this.tripID).subscribe(trip => {
        if (trip && trip[0] && trip[0].driverData) {
          const dat = new Date();
          this.trajet = trip[0];
          const trajetDate = new Date(this.trajet.date);
          this.archived = (dat > trajetDate);
          this.hasProposed = Cookie.get('_id') === this.trajet.conducteur;
          this.complet = this.trajet.complet === 'true';

        }
        console.log('Retour du trajet : ');
        console.log(this.trajet);

        this.loading = false;
      });

      this.trajetsService.getMesReservations(Cookie.get('_id')).subscribe(res => {
        for (const resa of res) {
          if (resa._id === this.tripID) {
            this.hadReserved = true;
            break;
          }
        }
      });
    });
  }

  /**
   *
   * todo : refactor dans service auth
   */
  isAdmin(): boolean {
    return Cookie.get('isAdmin') === 'true';
  }

  /**
   * Fonction de debug admin only : force le changement de date
   */
  updateDate() {
    this.trajetsService.updateDate(this.tripID, this.newDate).subscribe(res => {
      /// rien a faire
    });
  }

  addResa() {
    this.trajetsService.addResa(this.tripID, Cookie.get('_id')).subscribe(res => {
      this.hadReserved = true;
    });
  }

}
