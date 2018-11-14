import {EventEmitter, Injectable, isDevMode, Output} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

/**
 * Service partagé d'authentification
 */
@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl + ':' + environment.apiPort;
  @Output() change: EventEmitter<null> = new EventEmitter();

  subject: Subject<Observable<any>> = new Subject(); //générateur d'evenements pour AuthComponent

  constructor(private http: HttpClient) {}

  // getMembres(): Observable<any> {
  //   console.log("getMembres()");
  //   return this.http.get(this.baseUrl + "/membres");
  // }

  public login(mail: string, password: string): Observable <any> {
    // this.change.emit();
    // console.log("AuthService : Login avec " + mail + ' / ' + password);
    const obs: Observable<any> = this.http.get<any>(this.baseUrl + '/membres/authenticate/' + mail + '/' + password);
    this.subject.next(obs); // transmettre l'évènement aux observers (membreComponent)
    return  obs;
  }
}
