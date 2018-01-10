import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class VehiculesService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + ':' + environment.apiPort;

  create(model: any): Observable <any> {
    const url: string = this.baseUrl + '/vehicules';
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, headers);
  }

  getByUserID(id: string): Observable <any> {
    console.log('ALERTE : service non implémenté');
    return this.http.get(this.baseUrl + '/vehicules/' + id);
  }

  getBrands(startsWith: string): Observable <any> {
    console.log('ALERTE : service non implémenté');
    return this.http.get(this.baseUrl + '/vehicules/brands/' + startsWith);
  }

  getColors(): Observable <any> {
    console.log('ALERTE : service non implémenté');
    return this.http.get(this.baseUrl + '/vehicules/colors');
  }

}
