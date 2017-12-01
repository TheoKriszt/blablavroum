import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";




@Injectable()
export class MembresService {

  constructor(private http: HttpClient) { }

  getMembres(): Observable<any>{
    console.log("getMembres()");
	return this.http.get("http://localhost:8888/membres");
  }

}
