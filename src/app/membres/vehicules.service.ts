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
    return this.http.get(this.baseUrl + '/vehicules/driverId/' + id);
  }


}
