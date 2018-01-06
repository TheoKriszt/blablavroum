import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    /**
     * Pour pages à accès administrateur, renvoie sur /login sinon
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (Cookie.get('isAdmin') == 'true'){
        return true;
      }

      if (!Cookie.get('mail')){
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }else {
        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
      }

      return false;
    }
}
