import { Component, OnInit } from '@angular/core';
import {TrajetsService} from "../trajets.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) { }

  trajet: Object = {};
  // driver: Object = {};
  loading: boolean = true;

  mapOptions: any = {};
  google: any;

  ngOnInit() {

    this.mapOptions = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    this.route.params.subscribe(routeParams => {
      let tripID = routeParams.tripID;

      this.trajetsService.getTripDetails(tripID).subscribe(trip => {
        if(trip && trip[0] && trip[0].driverData){
          this.trajet = trip[0];
        }else
        console.log("Retour du trajet : ");
        console.log(this.trajet);
        this.loading = false;
      });



    });
  }

}
