import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrajetsService} from '../trajets.service';
import {isArray, isNullOrUndefined} from 'util';

@Component({
  selector: 'app-trajets-recherche',
  templateUrl: './trajets-recherche.component.html',
  styleUrls: ['./trajets-recherche.component.css']
})
export class TrajetsRechercheComponent implements OnInit, OnChanges {
  ngOnChanges(){
    console.log('trajets-recherche a changé');
  }

  // villeDepart: String;
  // villeArrivee: String;

  private trajets: Object = {};
  // trajets: Object;

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) {

  }

  ngOnInit() {
    console.log('Init de trajets-recherche');

    this.route.params.subscribe(routeParams => {
      console.log('Invocation de trajets-recherche');

      if (isNullOrUndefined(routeParams.villeDepart) || isNullOrUndefined(routeParams.villeDepart)){
        console.log("Depart ou arrivée manquants");
        return null;
      }


      if (isNullOrUndefined(routeParams.dateDepart)) {
        this.trajetsService.getTrajetsRecherche(routeParams.villeDepart, routeParams.villeArrivee).subscribe(mongoRes => this.trajets = mongoRes);
      }
      else
        this.trajetsService.getTrajetsRechercheDate(routeParams.villeDepart, routeParams.villeArrivee, routeParams.dateDepart).subscribe(mongoRes => this.trajets = mongoRes);

    });
  }

}
