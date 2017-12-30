import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})

export class TrajetsComponent implements OnInit {
  formModel: any =  {};
  loading: boolean = false;


  //todo : remove ?
  trajets: Object = {};
  villeDepart: String = '';
  villeArrivee: String = '';
  dateDepart: String = '';
  // todo : fin

  constructor(private router: Router,) {}

  ngOnInit() {
    this.formModel.villeDepart = 'Montpellier';
    this.formModel.villeArrivee = 'Lyon';
  }

  submitTripSearch(){
    this.loading = true;

    if (this.formModel.dateDepart){
      this.router.navigate(['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee, this.formModel.dateDepart]);
    }else {
      this.router.navigate(['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee]);
    }
    this.loading = false;
  }

  swap() {
    let temp = this.formModel.villeDepart;
    this.formModel.villeDepart = this.formModel.villeArrivee;
    this.formModel.villeArrivee = temp;
  }

}
