import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AlreadyAuthGuard implements CanActivate {

    constructor(private router: Router) { }

  /**
   * Pour page de login : si l'user est déjà loggé : l'envoie sur dashboard
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!Cookie.get('mail')) {
            return true;
        }

        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
