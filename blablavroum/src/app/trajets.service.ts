import { Injectable } from '@angular/core';
import {httpClient} from '@angular/common/http';

@Injectable()
export class TrajetsService {

  constructor(http : HTTPClient) { }
  getTrajets(){
	return this.http.get("http://localhost:8888");

}
