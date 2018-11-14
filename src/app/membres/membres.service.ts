import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + ':' + environment.apiPort;

  // private readonly headers = {header: {'Content-Type': 'application/json'}};
  private readonly headers = new HttpHeaders({'Content-Type': 'application/json'});
  // private readonly headers = new Headers({'Content-Type': 'application/json'});
  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  create(model: any): Observable <any> {

    const url: string = this.baseUrl + '/membres';


    return this.http.post(url, model, this.options);
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
    return this.http.post(url, model, this.options);
  }

  getRating(from: string, to: any, tripID: string): Observable <any> {
    return this.http.get(this.baseUrl + '/membres/rating/' + from + '/' + to + '/' + tripID);
  }

  setRating(from: string, to: any, tripID: string, driverRating: number): Observable <any> {
    const rating = {
      'from' : from,
      'to' : to,
      'tripID' : tripID,
      'rating' : driverRating
    };
    return this.http.post(this.baseUrl + '/membres/rating', rating);
  }
}
