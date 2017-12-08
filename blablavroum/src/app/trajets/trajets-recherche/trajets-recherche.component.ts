import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrajetsService} from "../trajets.service";

@Component({
  selector: 'app-trajets-recherche',
  templateUrl: './trajets-recherche.component.html',
  styleUrls: ['./trajets-recherche.component.css']
})
export class TrajetsRechercheComponent implements OnInit {

  // villeDepart: String;
  // villeArrivee: String;
  trajets: Object;

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) {

  }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      console.log("Invocation de trajets-recherche");

      this.trajetsService.getTrajetsRecherche(routeParams.villeDepart, routeParams.villeArrivee).subscribe(mongoRes => this.trajets = mongoRes);

    });
  }

}
