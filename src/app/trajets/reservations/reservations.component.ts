import { Component, OnInit } from '@angular/core';
import {TrajetsService} from "../trajets.service";
import {Cookie} from "ng2-cookies/src/cookie";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  myReservations: Object = [];

  constructor(private trajetsService: TrajetsService) { }

  ngOnInit() {
    this.trajetsService.getMesReservations(Cookie.get('_id')).subscribe(res => {
      console.log("Mes reservations : ");
      console.log(res);
      this.myReservations = res;
    });
  }

  hasreservations(){
    return this.myReservations && this.myReservations[0];
  }

}
