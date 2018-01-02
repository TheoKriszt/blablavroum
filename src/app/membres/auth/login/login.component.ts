import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [AuthComponent] // gère la gestion login/mdp / attributs de l'utilisateur connecté
})

// @Injectable()
export class LoginComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log("something changed in  login (child)")
  }

  model: any = {}; // champs du formulaire
  loading = false;
  returnUrl: string; // si forcé de se logger pour une action, permet de revenir à la  bonne page

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.loading = true;

    this.authService.login(this.model.mail, this.model.password)
      .subscribe(res => {
        this.loading = false;
        if(this.returnUrl == '/'){
          this.returnUrl = '/dashboard';
        }
        // console.log('LoginComponent : redirection vers ' + this.returnUrl)
        this.router.navigate([this.returnUrl]);
      });
  }
}
