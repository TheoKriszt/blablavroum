import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrajetsService} from '../trajets.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-trajets-recherche',
  templateUrl: './trajets-recherche.component.html',
  styleUrls: ['./trajets-recherche.component.css']
})
export class TrajetsRechercheComponent implements OnInit {

  trajets: any = {};

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) {}

  ngOnInit() {

    this.route.params.subscribe(routeParams => {

      //todo : essayer avec if(routeParams.villeDepart && routeParams.villeArrivee)
      if (isNullOrUndefined(routeParams.villeDepart) || isNullOrUndefined(routeParams.villeDepart)){
        console.log("Depart ou arrivée manquants");
        return null;
      }


      if (isNullOrUndefined(routeParams.dateDepart)) {
        this.trajetsService.getTrajetsRecherche(routeParams.villeDepart, routeParams.villeArrivee).subscribe(mongoRes => {
          return this.trajets = mongoRes;
        });
      }
      else
        this.trajetsService.getTrajetsRechercheDate(routeParams.villeDepart, routeParams.villeArrivee, routeParams.dateDepart).subscribe(mongoRes => {

          return this.trajets = mongoRes;
        });

    });
  }

  gotResults(): boolean{
    return (this.trajets[0] != undefined);
  }

}
