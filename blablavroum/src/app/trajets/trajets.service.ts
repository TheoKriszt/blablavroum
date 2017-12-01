import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TrajetsService {
  villeDepart: String;
  villeArrivee: String;

  constructor(private http: HttpClient) {}

  getTrajets(): Observable<any>{
    console.log("getTrajets()");
	  return this.http.get("http://localhost:8888/trajets");
  }

}
