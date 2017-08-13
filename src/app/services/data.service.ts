import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  estado: any;

  microrregiaoUrl: string;
  mesorregiaoUrl: string;
  coordenadasUrl: string;

  constructor(private http: Http) {
    this.microrregiaoUrl = '../assets/data/microrregioes/';
    this.mesorregiaoUrl = '../assets/data/mesorregioes/';
    this.coordenadasUrl = '../assets/data/coordenadas/';
  }

  getEstado (codigo_estado: number) {
    return this.http.get(`assets/data/coordenadas/${codigo_estado}.json`)
      .map((response) => response.json());
  }

  listMicrorregioes(estado: number) {
    return this.http.get(`${this.microrregiaoUrl}${estado}.json`)
    .map((response) => response.json());
  }

}
