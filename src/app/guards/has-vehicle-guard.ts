import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {VehiculesService} from '../membres/vehicules.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class HasVehicleGuard implements CanActivate {

    constructor(private router: Router, private vehiculeService: VehiculesService, private cs: CookieService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.cs.get('hasVehicle') === 'true') {
        console.log('Cookie OK');
        return true;
      } else {
        console.log(this.cs.getAll());
        this.router.navigate(['/profile'], { queryParams: {
            'cause': 'Il faut avoir renseigné au moins un véhicule personnnel pour effectuer cette action' }});
        return false;
      }
    }
}
