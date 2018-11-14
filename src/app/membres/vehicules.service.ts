import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class VehiculesService {

  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + ':' + environment.apiPort;

  create(model: any): Observable <any> {
    const url: string = this.baseUrl + '/vehicules';
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, this.options);
  }

  getByUserID(id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/vehicules/driverId/' + id);
  }


}
