import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Headers} from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + ':' + environment.apiPort;

  create(model: any): Observable <any> {

    const url: string = this.baseUrl + '/membres';
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, headers);
  }

  getByID(id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/membres/id/' + id);
  }

  getTranchesAges(): Observable <any> {
    return this.http.get(this.baseUrl + '/membres/agerepartition');
  }

  getMoyenneAge(): Observable <any> {
    return this.http.get(this.baseUrl + '/membres/moyenneage');
  }

  getNbrUtilisateurs(): Observable <any> {
    return this.http.get(this.baseUrl + '/membres/count');
  }

  update(model: Object): Observable<any> {

    console.log('update membre : ');
    console.log(model);

    const url: string = this.baseUrl + '/membres/update';
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, headers);
  }
}
