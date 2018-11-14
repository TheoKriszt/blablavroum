import { Component, OnInit } from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  myReservations: Object = [];

  constructor(private trajetsService: TrajetsService, private cs: CookieService) { }

  ngOnInit() {
    this.trajetsService.getMesReservations(this.cs.get('_id')).subscribe(res => {
      console.log('Mes reservations : ');
      console.log(res);
      this.myReservations = res;
    });
  }

  hasreservations() {
    return this.myReservations && this.myReservations[0];
  }

}
