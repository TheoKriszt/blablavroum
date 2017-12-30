import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MembresService} from '../membres.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  model: any = {};
  loading = false;
  // @Output() setLogged = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private membreService: MembresService) { }

  register() {
    this.loading = true;
    this.membreService.create(this.model)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          console.log("Utilisateur enregistré")

          this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  ngOnInit() {
  }

  // sendIt(){
  //   this.setLogged.emit(true); // fixme dafuq ?
  // }

}
