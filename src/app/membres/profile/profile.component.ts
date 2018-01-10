import { Component, OnInit } from '@angular/core';
import {MembresService} from '../membres.service';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: Object = {};
  loading = true;

  constructor(private membreService: MembresService) { }

  ngOnInit() {


    this.membreService.getByID(Cookie.get('_id')).subscribe(res => {
      if (res && res[0] !== undefined) {
        res = res[0];
      } else {
        return;
      }


      this.model = res;
      this.loading = false;
    });
  }

  submit() {
    this.loading = true;
    this.membreService.update(this.model).subscribe(res => {
      this.loading = false;

    });

  }

}
