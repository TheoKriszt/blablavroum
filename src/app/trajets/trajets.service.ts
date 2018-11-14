import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class TrajetsService {

  baseUrl = environment.apiUrl + ':' + environment.apiPort;
  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(private http: HttpClient) {}

  // getDerniersTrajets(limit: number): Observable <any> {
  //   return this.http.get(this.baseUrl + '/trajets/limit/' + limit);
  // }

  getTrajetsRecherche(searchParams): Observable <any> {

    let tripUrl: string = this.baseUrl + '/trajets/search/' + searchParams.villeDepart + '/' + searchParams.villeArrivee;


    if (searchParams.dateDepart) {
      tripUrl += '/' + searchParams.dateDepart;
    }

    // console.log('searchParams');
    // console.log(searchParams);

    tripUrl += '?';

    tripUrl += '&orderBy=' + (searchParams.orderBy || 'heure'); // paramètres de recherche et leur valeurs par défaut
    tripUrl += '&prixMax=' + (searchParams.prixMax || 9999) ;
    tripUrl += '&evalMin=' + (searchParams.evalMin || 0);

    return this.http.get(tripUrl);
  }

  getMesTrajetsProposes(user_id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/driver/' + user_id);
  }

  getMesReservations(user_id: string): Observable <any> {
    return this.http.get(this.baseUrl + '/reservations/' + user_id);
  }

  create(model: any): Observable <any> {
    // console.log('Creation d\'un trajet');
    const body: any = model;
    // console.log(body);

    const url: string = this.baseUrl + '/trajets';
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(url, body, this.options);
  }

  getMoyennePrix(): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/moyenneprix');
  }

  getTripDetails(tripID: any): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/id/' + tripID);
  }

   getNbrTrajet(): Observable <any> {
    return this.http.get(this.baseUrl + '/trajets/count');
  }

  // getAllTrajet(): Observable <any> {
  //   return this.http.get(this.baseUrl + '/trajets');
  // }

  updateDate(tripID: string, newDate: string): Observable <any> {
    const model = {
      '_id' : tripID,
      'date' : newDate
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/trajets/update/updateDate', model, this.options);
  }

  addResa(tripID: string, userID: string): Observable <any> {
    const reservation = {
      'userID' : userID,
      'tripID' : tripID
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/reservation', reservation, this.options);
  }

  cancelResa(tripID: string, userID: string) {
    const reservation = {
      'userID' : userID,
      'tripID' : tripID
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + '/reservation/remove', reservation, this.options);
  }

  getAllTrips() {
    return this.http.get(this.baseUrl + '/trajets');
  }
}
