import {Component, OnChanges, OnInit} from '@angular/core';
import { MembresService } from './membres.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit{

  // private membres: Object[];
  private model : any;
  private isLoggedIn: boolean = false;

  constructor(private authService : AuthService) { }


  ngOnInit() {
    console.log("Chargement du composant membres");
    // this.membresService.getMembres().subscribe(res => this.membres = res);
    // this.authService.login()



  }

}
