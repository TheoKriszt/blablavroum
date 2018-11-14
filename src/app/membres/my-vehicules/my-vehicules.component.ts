import { Component, OnInit } from '@angular/core';
import {VehiculesService} from '../vehicules.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-my-vehicules',
  templateUrl: './my-vehicules.component.html',
  styleUrls: ['./my-vehicules.component.css']
})
export class MyVehiculesComponent implements OnInit {

  vehicules: any = [];

  model: any = {}; // contenu formulaire ajout de vehicule

  formEnabled = false;

  autocompleteMarques: string[] = [];
  autocompleteModeles: string[] = [];
  autocompleteCouleurs: string[] = [];

  constructor(private vehiculesService: VehiculesService, private cs: CookieService) { }

  ngOnInit() {
    this.vehiculesService.getByUserID(this.cs.get('_id')).subscribe(res => {
      this.vehicules = res;
    });
  }

  hasVehicules(): boolean {
    return this.vehicules[0] !== undefined;
  }

  toggleVehiculeForm() {
    this.formEnabled = !this.formEnabled;
  }

  onAddVehicule() {

    if (this.model.marque === '' ||
        this.model.modele === '' ||
        this.model.couleur === '') {
      return;
    }

    this.model.ownerID = this.cs.get('_id');
    this.vehiculesService.create(this.model).subscribe(res => {
      this.vehicules.push(this.model);
    });
  }

  filterBrand(event) {
    const brands: string[] = ['Aston Martin', 'DeLorean', 'Tesla', 'Audi', 'BMW', 'Citroën', 'Dacia', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Lada', 'Mercedes', 'Peugeot', 'Renault', 'Seat', 'Skoda', 'Smart',  'Suzuki', 'Volvo', 'VW'];
    const query = event.query;
    // console.log('query : ', query);
    this.autocompleteMarques = [];

    for (const brand of brands) {
      if (brand.startsWith(query)) {
        this.autocompleteMarques.push(brand);
      }
    }

  }


  filterModels(event: any) {
    const models: string[] = ['DMC-12', 'A1', 'A5', 'S1', 'Q3', 'Q5', 'Clio', 'Espace', 'Megane', 'Twingo', 'Up', 'Twizy', 'Logan', 'Sandero', 'Rav4', 'Celerio', 'Citigo', 'Ibiza', 'MII', 'Dokker', 'Master', 'Panda', 'Granta', 'Ka', 'Lodgy', 'C1', 'C2', 'C3', 'C4', 'Aygo', '108', '206', '207', '1008', 'Micra'];
    const query = event.query;
    // console.log('query : ', query);
    this.autocompleteModeles = [];

    for (const model of models) {
      if (model.startsWith(query)) {
        this.autocompleteModeles.push(model);
      }
    }

  }

  filterColors(event) {
    const colors: string[] = ['blanche', 'noire', 'rouge', 'jaune', 'verte', 'orange', 'griss', 'metallisée', 'argent', 'or', 'beige', 'brune'];
    const query = event.query;
    this.autocompleteCouleurs = [];

    for (const color of colors) {
      if (color.startsWith(query)) {
        this.autocompleteCouleurs.push(color);
      }
    }
  }
}
