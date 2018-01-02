import {
  Component, OnInit
} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{


  isLogged: boolean = false;
  private displayedName: string = '';

  private firstName: string = '';
  private lastName: string = '';
  private admin = false;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {

    // se mettre à jour quand le service partagé lance un login
    this.authService.subject.subscribe(obs => {
      obs.subscribe(res => {
        this.checkLogin(res);
      });
    });

    // au démarrage / après refresh de la page => verif. si déjà loggé
    if( Cookie.check('mail') && !this.isLogged){
      this.loadUser();
    }
  }

  /**
   * Verifie le retour du service d'authentification et met à jour les Cookies de session
   * @param user {Array} retour de AuthService.login()
   */
  checkLogin(user: any){

    if (user){
      user = user[0];
    }else return;

    Cookie.set('_id', user._id);
    Cookie.set('mail', user.mail);
    Cookie.set('firstName', user.prenom);
    Cookie.set('lastName', user.nom);
    Cookie.set('isAdmin', (user.role.indexOf('admin') >= 0 ) ? 'true' : 'false');

    this.loadUser();
  }

  logout(){
    // console.log('Logging out -->[]');
    Cookie.deleteAll();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  isAdmin(){
    return this.admin;
  }


  /**
   * Depuis les cookies de session, met à jour les infos de base (notamment pour les guards)
   */
  private loadUser() {
    this.firstName = Cookie.get('firstName');
    this.lastName = Cookie.get('lastName');
    this.displayedName = this.firstName + ' ' + this.lastName[0]; // prenom + initiale nom
    this.admin = Cookie.get('isAdmin') == 'true';

    this.isLogged = true;
  }
}
