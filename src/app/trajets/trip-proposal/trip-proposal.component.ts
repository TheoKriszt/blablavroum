import { Component, OnInit } from '@angular/core';
import {TrajetsService} from "../trajets.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CalendarModule} from 'primeng/primeng';
import {Cookie} from "ng2-cookies";


@Component({
  selector: 'app-trip-proposal',
  templateUrl: './trip-proposal.component.html',
  styleUrls: ['./trip-proposal.component.css']
})
export class TripProposalComponent implements OnInit {

  constructor(private router: Router,
              private trajetService: TrajetsService) { }

  model: any = {};
  loading = false;
  heureDepart: Date = new Date(); // géré hors formulaire

  ngOnInit() {
    this.model.villeDepart = 'Montpellier';
    this.model.adresseDepart = 'Place Eugene Bataillon';
    this.model.villeArrivee = 'Lyon';
    this.model.adresseArrivee = 'Gare Lyon Perrache';
    this.model.dateDepart = '2017-12-31';
    // this.model.heureDepart = '54';
    // this.model.minuteDepart = '69';
    this.model.prix = '8';
    this.model.nbPlaces = '2';

  }


  submit(){
    // console.log("Submitting new trip");
    this.loading = true;

    // transformer au format ii:ss
    let hour: string = (this.heureDepart.getHours() < 10 ? '0' : '') + this.heureDepart.getHours();
    let minutes: string = (this.heureDepart.getMinutes() < 10 ? '0' : '') + this.heureDepart.getMinutes();
    let time: string = hour + ':' + minutes;
    this.model.heureDepart = time;
    this.model.conducteur = Cookie.get('_id'); // id_conducteur


    this.trajetService.create(this.model).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    });
  }

}
