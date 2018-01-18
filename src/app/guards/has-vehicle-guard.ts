import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {VehiculesService} from '../membres/vehicules.service';

@Injectable()
export class HasVehicleGuard implements CanActivate {

    constructor(private router: Router, private vehiculeService: VehiculesService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (Cookie.get('hasVehicle') === 'true') {
        console.log('Cookie OK');
        return true;
      } else {
        console.log(Cookie.getAll());
        this.router.navigate(['/profile'], { queryParams: {
            'cause': 'Il faut avoir renseigné au moins un véhicule personnnel pour effectuer cette action' }});
        return false;
      }
    }
}
