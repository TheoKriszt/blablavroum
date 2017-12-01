import { Component, OnInit } from '@angular/core';
import { MembresService } from './membres.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  private membres: Object[];

  constructor(private membresService: MembresService) { }

  ngOnChange() {
    console.log("Membres a changé");
    console.log(this.membres);
  }

  ngOnInit() {
    console.log("Chargement du composant membres");
    this.membresService.getMembres().subscribe(res => this.membres = res);
  }

}
