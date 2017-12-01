import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trajets-recherche',
  templateUrl: './trajets-recherche.component.html',
  styleUrls: ['./trajets-recherche.component.css']
})
export class TrajetsRechercheComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => console.log("Invocation !"));

  }

}
