import { Component, OnInit } from '@angular/core';
import {MembresService} from '../membres.service';
import {Cookie} from 'ng2-cookies';
import {ActivatedRoute} from '@angular/router';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: Object = {};
  loading = true;
  msgs: Message[] = [];

  constructor(private membreService: MembresService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.msgs = [];

    if (this.route.snapshot.queryParams['cause'] !== '') {
      this.msgs.push({
        severity: 'warning',
        summary: '',
        detail: this.route.snapshot.queryParams['cause']
      });
    }


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
