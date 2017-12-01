import { Component, OnInit } from '@angular/core';
import { TrajetsService } from './trajets.service';


@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {
  private trajets: Object;

  constructor(private trajetsService: TrajetsService) {}

  /**
   * Quand un attribut est changé
   */
  ngOnChange() {
    console.log("Trajets a changé");
    console.log(this.trajets);
  }

  ngOnInit() {
    console.log("Chargement du composant trajets");
    this.trajetsService.getTrajets().subscribe(res => this.trajets = res);
  }

}
