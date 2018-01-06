import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Message, MessagesModule} from 'primeng/primeng';

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
  msgs: Message[] =  [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.msgs = [];
    if(this.route.snapshot.queryParams['origin'] &&
      this.route.snapshot.queryParams['origin'] == 'register'){
      this.msgs.push({severity:'success', summary:'Compte créé', detail:'Vous pouvez maintenant vous connecter'});
      this.model.mail = this.route.snapshot.queryParams['mail'] || '';

    }

  }

  login(){
    this.loading = true;

    console.log("LoginComponent : authentification par " + this.model.mail + ' / ' + this.model.password);

    this.authService.login(this.model.mail, this.model.password)
      .subscribe(res => {
        this.loading = false;

        console.log("LoginComponent : retour de requete d'auth : ");
        console.log(res);

        if (res[0]) {
          if(this.returnUrl == '/'){
            this.returnUrl = '/dashboard';
          }
          this.router.navigate([this.returnUrl]);
        }else {
          console.log("pb d'auth !!");
          this.msgs.push({severity:'error', summary:'Erreur d\'authentification', detail:'Vérifiez que votre adresse mail et votre mot de passe sont valides'});
        }


      });
  }
}
