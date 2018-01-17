import { Component, OnInit } from '@angular/core';
import {VehiculesService} from '../vehicules.service';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-my-vehicules',
  templateUrl: './my-vehicules.component.html',
  styleUrls: ['./my-vehicules.component.css']
})
export class MyVehiculesComponent implements OnInit {

  vehicules: any = [];

  model: any = {}; // contenu formulaire ajout de vehicule

  formEnabled = false;

  constructor(private vehiculesService: VehiculesService) { }

  ngOnInit() {
    this.vehiculesService.getByUserID(Cookie.get('_id')).subscribe(res => {
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
    this.model.ownerID = Cookie.get('_id');
    this.vehiculesService.create(this.model).subscribe(res => {
      this.vehicules.push(this.model);
    });
  }



}
