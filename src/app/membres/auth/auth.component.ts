import {
  Component, OnInit
} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {VehiculesService} from '../vehicules.service';
import {isEmpty} from 'rxjs/operator/isEmpty';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {


  isLogged = false;
  private displayedName = '';

  private firstName = '';
  private lastName = '';
  private admin = false;

  constructor(private authService: AuthService,
              private vehiculeService: VehiculesService,
              private router: Router,
              private cs: CookieService) {}

  ngOnInit() {

    // se mettre à jour quand le service partagé lance un login
    this.authService.subject.subscribe(obs => {
      obs.subscribe(res => {
        // console.log('Requête D\'auth recue');
        this.checkLogin(res);
      });
    });

    // au démarrage / après refresh de la page => verif. si déjà loggé
    if ( this.cs.check('mail') && !this.isLogged) {
      this.loadUser();
    }
  }

  /**
   * Verifie le retour du service d'authentification et met à jour les Cookies de session
   * @param user {Array} retour de AuthService.login()
   */
  checkLogin(user: any) {

    if (user) {
      user = user[0];
    } else {
      return;
    }

    this.cs.set('_id', user._id);
    this.cs.set('mail', user.mail);
    this.cs.set('firstName', user.prenom);
    this.cs.set('lastName', user.nom);
    this.cs.set('isAdmin', (user.role.indexOf('admin') >= 0 ) ? 'true' : 'false');

    this.vehiculeService.getByUserID(user._id).subscribe(res => {
      // console.log('res', res);
      if (res[0] !== undefined) {
        this.cs.set('hasVehicle', 'true');
      } else {
        this.cs.set('hasVehicle', 'false');
      }
    });

    this.loadUser();
  }

  logout() {
    // console.log('Logging out -->[]');
    this.cs.deleteAll();
    this.isLogged = false;
    this.router.navigate(['/']);
  }

  isAdmin() {
    return this.admin;
  }


  /**
   * Depuis les this.css de session, met à jour les infos de base (notamment pour les guards)
   */
  private loadUser() {
    this.firstName = this.cs.get('firstName');
    this.lastName = this.cs.get('lastName');
    this.displayedName = this.firstName + ' ' + this.lastName[0]; // prenom + initiale nom
    this.admin = this.cs.get('isAdmin') === 'true';

    this.isLogged = true;
  }
}
