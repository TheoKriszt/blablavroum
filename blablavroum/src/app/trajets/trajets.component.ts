import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  private trajets = [];
  constructor(trajetService : TrajetsService) { }

  ngOnInit() {
	this.trajetService.getTrajets().subscribe(rd => trajets = res);
  }

}
