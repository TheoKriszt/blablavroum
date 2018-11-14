import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) {
    }

  /**
   * Pour pages demandant d'être loggé : renvoie l'user sur /login si non loggés
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.cookieService.get('mail')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
