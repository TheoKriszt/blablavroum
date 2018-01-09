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
  orderByParam: string = '';

  constructor(private route: ActivatedRoute, private trajetsService: TrajetsService) {}

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.route.queryParams
        .subscribe(params => {
          this.orderByParam = params.orderBy;
          let searchOptions = {
            'orderBy': params.orderBy,
            'evalMin': params.evalMin,
            'prixMax': params.prixMax || 0,
            'villeDepart' : routeParams.villeDepart,
            'villeArrivee' : routeParams.villeArrivee,
            'dateDepart' : routeParams.dateDepart
          };

          this.trajetsService.getTrajetsRecherche(searchOptions).subscribe(mongoRes => {
            this.trajets = mongoRes;
          });

        });
    });
  }

  gotResults(): boolean{
    return (this.trajets[0] != undefined);
  }

}
