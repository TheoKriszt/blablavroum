import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
// import * as http from "http";
// import * as http from "http";


@Injectable()
export class TrajetsService {

  constructor(private http: HttpClient) {}

  getTrajets(): Observable<any>{
	return this.http.get("http://localhost:8888/trajets");
  }

}
