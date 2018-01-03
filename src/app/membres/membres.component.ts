import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../guards/auth-guard";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css'],
})
export class MembresComponent implements OnInit{

  constructor(
    // private authComponent: AuthComponent
  ) { }


  ngOnInit() {
  }

  // isAdmin(){
  //   return this.authComponent.isAdmin();
  // }

}
