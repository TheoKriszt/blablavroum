import {Component, OnInit} from '@angular/core';
import {MembresService} from '../membres.service';
import {TrajetsService} from '../../trajets/trajets.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  public data: any;
  moyenneage : string = '';
  moyenneprix : string = '';
  nbrUser : string = '';
  nbrTrajet : string = '';

  constructor(private mservice: MembresService, private tservice: TrajetsService) {
  }

  ngOnInit() {

    this.mservice.getTranchesAges().subscribe(mongoRes => {

      this.data = {
        labels: ['18-25', '26-35', '36-50', '51+'],
        datasets: [
          {
            data: [mongoRes.age1825, mongoRes.age2635, mongoRes.age3650, mongoRes.age50],
            backgroundColor: [
              '#84095b',
              '#962410',
              '#0b6817',
              '#270d99'
            ],
            hoverBackgroundColor: [
              '#84095b',
              '#962410',
              '#0b6817',
              '#270d99'
            ]
          }]
      };

    });

    this.mservice.getMoyenneAge().subscribe(mongoRes => {this.moyenneage = mongoRes.avg});    
    this.mservice.getNbrUtilisateurs().subscribe(mongoRes => {this.nbrUser = mongoRes.count});
    this.tservice.getMoyennePrix().subscribe(mongoRes => {this.moyenneprix = mongoRes.avg});
    this.tservice.getNbrTrajet().subscribe(mongoRes => {this.nbrTrajet = mongoRes.count});
	
    console.log('init getMoyenneAge done');
  }


  }
