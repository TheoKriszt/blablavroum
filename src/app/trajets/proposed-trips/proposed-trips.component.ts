import { Component, OnInit } from '@angular/core';
import {TrajetsService} from "../trajets.service";
import {Cookie} from "ng2-cookies/src/cookie";

@Component({
  selector: 'app-proposed-trips',
  templateUrl: './proposed-trips.component.html',
  styleUrls: ['./proposed-trips.component.css']
})
export class ProposedTripsComponent implements OnInit {

  mesTrajets: Object = [];
  anyTrajet: boolean = false;

  constructor(private trajetsService: TrajetsService) { }

  ngOnInit() {
    this.trajetsService.getMesTrajetsProposes(Cookie.get('_id')).subscribe(res => {
      this.mesTrajets = res;
      this.anyTrajet = res[0] != undefined;
      console.log(this.mesTrajets);
    });
  }

}
