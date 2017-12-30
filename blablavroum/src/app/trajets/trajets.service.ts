import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TrajetsService {

  // headers: Headers;

  nodePort = 8888;
  baseUrl = (!isDevMode() ? 'http://theo.kriszt.fr:' : 'http://localhost:') + this.nodePort; // si en prod, va chercher sur le serveur, sinon sur le mongoDB local

  constructor(private http: HttpClient) {
    // this.headers= new Headers();
    // this.headers.append('Access-Control-Allow-Origin', '*');
  }


  getTrajets(): Observable<any>{
    console.log('getTrajets()');
    var res = this.http.get(this.baseUrl + '/trajets');
	  return res;
  }

  getTrajetsRecherche(villeDepart: String, villeArrivee: String): Observable<any>{
    console.log('getTrajetsRecherche('+ villeDepart+', ' + villeArrivee + ')');
    return this.http.get(this.baseUrl + '/trajets/' + villeDepart + '/' + villeArrivee);//.map((response: Response) => response.json());
  }

  getTrajetsRechercheDate(villeDepart: String, villeArrivee: String, dateDepart: String) {
    console.log('getTrajetsRechercheDate('+ villeDepart+', ' + villeArrivee + ', ' + dateDepart + ')');
    return this.http.get(this.baseUrl + '/trajets/' + villeDepart + '/' + villeArrivee + '/' + dateDepart);
  }
}
