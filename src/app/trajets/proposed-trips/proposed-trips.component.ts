import { Component, OnInit } from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-proposed-trips',
  templateUrl: './proposed-trips.component.html',
  styleUrls: ['./proposed-trips.component.css']
})
export class ProposedTripsComponent implements OnInit {

  mesTrajets: Object = [];
  anyTrajet = false;

  constructor(private trajetsService: TrajetsService, private cs: CookieService) { }

  ngOnInit() {
    this.trajetsService.getMesTrajetsProposes(this.cs.get('_id')).subscribe(res => {
      this.mesTrajets = res;
      this.anyTrajet = res[0] !== undefined;
      console.log(this.mesTrajets);
    });
  }

}
