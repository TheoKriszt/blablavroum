import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../guards/auth-guard";

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css'],
})
export class MembresComponent implements OnInit{

  constructor(authGuard: AuthGuard) { }


  ngOnInit() {
  }

}
