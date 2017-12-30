import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthComponent} from '../membres/auth/auth.component';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (Cookie.get('isAdmin') == 'true'){
        return true;
      }else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
      return false;
    }
}
