import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

@Injectable()
export class TrajetsService {

  constructor(private http: HttpClient) {}

  getTrajets(): Observable<any>{
    console.log("getTrajets()");
	  return this.http.get("http://localhost:8888/trajets");
  }

  getTrajetsRecherche(villeDepart: String, villeArrivee: String): Observable<any>{
    console.log("getTrajetsRecherche("+ villeDepart+", " + villeArrivee + ")");

    if(isNullOrUndefined(villeArrivee) || isNullOrUndefined(villeDepart)){
      villeArrivee = "";
      villeDepart = "";
    } else return this.http.get("http://localhost:8888/trajets/" + villeDepart + "/" + villeArrivee);
  }

  getTrajetsRechercheDate(villeDepart: String, villeArrivee: String, dateDepart: String) {
    console.log("getTrajetsRecherche("+ villeDepart+", " + villeArrivee + ", " + dateDepart + ")");

    return this.http.get("http://localhost:8888/trajets/" + villeDepart + "/" + villeArrivee + "/" + dateDepart);

  }
}
