import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {getQueryValue} from "@angular/core/src/view/query";


@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})

export class TrajetsComponent implements OnInit {
  formModel: any =  {};
  loading: boolean = false;

  orderByOptions: any[];
  selectedOrderByOption: any;


  //todo : remove ?
  trajets: Object = {};
  villeDepart: String = '';
  villeArrivee: String = '';
  dateDepart: String = '';
  // todo : fin

  constructor(private router: Router,) {}

  ngOnInit() {
    this.formModel.villeDepart = 'Montpellier'; // todo: remove
    this.formModel.villeArrivee = 'Lyon';

    this.orderByOptions = [
      {name: 'Prix', code: 'prix'},
      {name: 'Date', code: 'date'}
    ];
  }

  submitTripSearch(){
    this.loading = true;

    if(!this.selectedOrderByOption){
      this.selectedOrderByOption = {'code' : ''};
    }

    if (this.formModel.dateDepart){
      this.router.navigate(['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee, this.formModel.dateDepart],
        { queryParams: { orderBy: this.selectedOrderByOption.code} });
    }else {
      this.router.navigate(['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee],
        { queryParams: { orderBy: this.selectedOrderByOption.code} });
    }

    this.loading = false;
  }

  swap() {
    let temp = this.formModel.villeDepart;
    this.formModel.villeDepart = this.formModel.villeArrivee;
    this.formModel.villeArrivee = temp;
  }

}
