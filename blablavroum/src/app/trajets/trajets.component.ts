import {Component, isDevMode, OnInit} from '@angular/core';
import {TrajetsService} from './trajets.service';


@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})

export class TrajetsComponent implements OnInit {
  trajets: Object;
  villeDepart: String;
  villeArrivee: String;
  dateDepart: String;

  //correspondTrips : Object[] = [];

  constructor(private trajetsService: TrajetsService) {
    this.villeArrivee = "Lyon";
    this.villeDepart = "Montpellier";
  }

  ngOnInit() {
    // Plus besoin de lister tous les trajets dès le debut
    // this.trajetsService.getTrajets().subscribe(res => {
    //   return this.trajets = res;
    // });
  }

}
