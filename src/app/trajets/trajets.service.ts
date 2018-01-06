import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class TrajetsService {

  baseUrl = environment.apiUrl + ':' + environment.apiPort;


  constructor(private http: HttpClient) {}

  getTrajetsRecherche(searchParams): Observable <any> {

    let tripUrl: string = this.baseUrl + '/trajets/search/' + searchParams.villeDepart + '/' + searchParams.villeArrivee;

    if(searchParams.dateDepart) {
      tripUrl += '/' + searchParams.dateDepart;
    }

    console.log('searchParams');
    console.log(searchParams);

    tripUrl += '?';

    if(searchParams.orderBy){
      tripUrl += '&orderBy=' + searchParams.orderBy;
    }

    if(searchParams.prixMax){
      tripUrl += '&prixMax=' + searchParams.prixMax;
    }

    if(searchParams.evalMin){
      tripUrl += '&evalMin=' + searchParams.evalMin;
    }

    return this.http.get(tripUrl);
  }

  getMesTrajetsProposes(user_id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/driver/' + user_id);
  }

  getMesreservations(user_id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/reservations/' + user_id);
  }

  create(model: any): Observable <any>{
    // console.log('Creation d\'un trajet');
    let body: any = model;
    console.log(body);

    let url: string = this.baseUrl + '/trajets';
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(url, body, headers);
  }

  getTripDetails(tripID: any): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/id/' + tripID);
  }
}
