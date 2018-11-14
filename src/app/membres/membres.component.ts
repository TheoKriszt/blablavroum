import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css'],
})
export class MembresComponent implements OnInit {

  constructor(
    // private authComponent: AuthComponent
    private cs: CookieService
  ) { }


  ngOnInit() {
  }

  isAdmin(): boolean {
    return this.cs.get('isAdmin') === 'true';
  }

}
