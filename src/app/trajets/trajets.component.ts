import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})

export class TrajetsComponent implements OnInit {
  formModel: any =  {};
  loading = false;

  orderByOptions: any[];
  selectedOrderByOption: any;


  // todo : remove ?
  trajets: Object = {};
  villeDepart: String = '';
  villeArrivee: String = '';
  dateDepart: String = '';
  // todo : fin

  constructor(private router: Router, ) {}

  ngOnInit() {
    this.formModel.villeDepart = 'Montpellier'; // todo: remove
    this.formModel.villeArrivee = 'Lyon';

    this.formModel.evalMin = 0;

    this.orderByOptions = [
      {name: 'Prix', code: 'prix'},
      {name: 'Date', code: 'date'}
    ];
  }

  submitTripSearch(){
    this.loading = true;

    if (!this.selectedOrderByOption) {
      this.selectedOrderByOption = {'code' : ''};
    }

    this.formModel.evalMin /= 10; // 0..50 => 0..5 (permet les decimaux)

    // console.log('evalMin : ', this.formModel.evalMin);
    // console.log('pMax : ', this.formModel.prixMax);

    if (this.formModel.dateDepart) {
      this.router.navigate(
        ['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee, this.formModel.dateDepart],
        { queryParams: { orderBy: this.selectedOrderByOption.code, evalMin: this.formModel.evalMin, prixMax: this.formModel.prixMax} }
        );
    }else {
      this.router.navigate(
        ['/trajets', 'trajets-recherche', this.formModel.villeDepart, this.formModel.villeArrivee],
        { queryParams: { orderBy: this.selectedOrderByOption.code, evalMin: this.formModel.evalMin, prixMax: this.formModel.prixMax} }
        );
    }

    this.formModel.evalMin *= 10;

    this.loading = false;
  }

  /**
   * Inverse ville de depart et d'arrivee
   */
  swap() {
    const temp = this.formModel.villeDepart;
    this.formModel.villeDepart = this.formModel.villeArrivee;
    this.formModel.villeArrivee = temp;
  }

}
