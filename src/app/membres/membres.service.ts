import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Headers} from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  // nodePort = 8888;
  // baseUrl = (!isDevMode() ? 'http://theo.kriszt.fr:' : 'http://localhost:') + this.nodePort; // si en prod, va chercher sur le serveur, sinon sur le mongoDB local
  baseUrl = environment.apiUrl + ':' + environment.apiPort;

  // getMembres(): Observable<any> {
  //   console.log("getMembres()");
  //   return this.http.get(this.baseUrl + "/membres");
  // }

  // getMembreByMail(mail: string): Observable<any> {
  //   return this.http.get(this.baseUrl + "/membres/mail/" + mail);
  // }

  create(model: any): Observable <any>{

    let url: string = this.baseUrl + '/membres';
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, headers);
  }

  getByID(id: string): Observable <any> {
    return this.http.get(this.baseUrl + "/membres/" + id);
  }

  update(model: Object): Observable<any> {

    console.log('update membre : ');
    console.log(model);

    let url: string = this.baseUrl + '/membres/update';
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, model, headers);
  }
}
