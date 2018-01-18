import {Component, OnInit} from '@angular/core';
import {MembresService} from '../membres.service';
import {TrajetsService} from '../../trajets/trajets.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  loadingStats = true;

  public data: any;
  moyenneage = '';
  moyenneprix = '';
  nbrUser = '';
  nbrTrajet = '';
  trajets: any;
  // 46.3617025,3.4705509,6z

  latitude = 46.3617025;
  longitude = 3.4705509;
  zoom = 6;
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
              '#0080ff',
              '#00ff7f',
              '#fe7e00',
              '#fe007f'
            ],
            hoverBackgroundColor: [
              '#0080ff',
              '#00ff7f',
              '#fe7e00',
              '#fe007f'
            ]
          }]
      };

      this.loadingStats = false;
    });

    this.mservice.getMoyenneAge().subscribe(mongoRes => {this.moyenneage = mongoRes.avg; });
    this.mservice.getNbrUtilisateurs().subscribe(mongoRes => {this.nbrUser = mongoRes.count; });
    this.tservice.getMoyennePrix().subscribe(mongoRes => {this.moyenneprix = mongoRes.avg; });
    this.tservice.getNbrTrajet().subscribe(mongoRes => {this.nbrTrajet = mongoRes.count; });
    this.tservice.getAllTrips().subscribe(res => {
      this.trajets = res;
    });
  }


  }
