import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// import * as http from "http";

@Injectable()
export class TrajetsService {

  constructor(http : HttpClient) {}
  getTrajets(){
	return http.get("http://localhost:8888/trajets");
  }

}
