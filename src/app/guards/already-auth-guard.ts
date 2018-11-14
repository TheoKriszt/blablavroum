import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AlreadyAuthGuard implements CanActivate {
  private _cookieService: CookieService;

    constructor(private router: Router, cookieService: CookieService) {
      this._cookieService = cookieService;
    }

  /**
   * Pour page de login : si l'user est déjà loggé : l'envoie sur dashboard
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this._cookieService.get('mail')) {
            return true;
        }

        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
