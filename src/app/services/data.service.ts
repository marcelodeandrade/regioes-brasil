import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  estado: any;

  constructor(private http: Http) {}

  getEstado (codigo_estado: number) {
    return this.http.get(`assets/data/coordenadas/${codigo_estado}.json`)
      .map((response) => response.json());
  }

}
