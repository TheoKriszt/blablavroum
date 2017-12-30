import {EventEmitter, Injectable, isDevMode, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

/**
 * Service partagé d'authentification
 */
@Injectable()
export class AuthService {

  // private nodePort = 8888;
  // private baseUrl = (!isDevMode() ? 'http://theo.kriszt.fr:' : 'http://localhost:') + this.nodePort; // si en prod, va chercher sur le serveur, sinon sur le mongoDB local
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
    var obs: Observable<any> = this.http.get<any>(this.baseUrl + '/membres/authenticate/' + mail + '/' + password);
    this.subject.next(obs);
    return  obs;
  }
}
