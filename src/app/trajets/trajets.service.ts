import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class TrajetsService {

  // headers: Headers;

  // nodePort = 8888;
  // baseUrl = (!isDevMode() ? 'http://theo.kriszt.fr:' : 'http://localhost:') + this.nodePort; // si en prod, va chercher sur le serveur, sinon sur le mongoDB local
  // apiUrl = environment.apiUrl;
  baseUrl = environment.apiUrl + ':' + environment.apiPort;


  constructor(private http: HttpClient) {}

  getTrajetsRecherche(villeDepart: String, villeArrivee: String): Observable<any>{
    console.log('getTrajetsRecherche('+ villeDepart+', ' + villeArrivee + ')');
    return this.http.get(this.baseUrl + '/trajets/' + villeDepart + '/' + villeArrivee);
  }

  getTrajetsRechercheDate(villeDepart: String, villeArrivee: String, dateDepart: String): Observable <any> {
    // console.log('getTrajetsRechercheDate('+ villeDepart+', ' + villeArrivee + ', ' + dateDepart + ')');
    return this.http.get(this.baseUrl + '/trajets/' + villeDepart + '/' + villeArrivee + '/' + dateDepart);
  }

  getMesTrajetsProposes(user_id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/' + user_id);
  }

  create(model: any): Observable <any>{
    // console.log('Creation d\'un trajet');
    let body: any = model;
    console.log(body);

    let url: string = this.baseUrl + '/trajets';
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(url, body, headers);
  }
}
