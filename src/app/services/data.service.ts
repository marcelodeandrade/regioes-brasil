import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  estado: any;

  microrregiaoURL: string;
  mesorregiaoURL: string;
  coordenadasURL: string;
  estadosURL: string;

  constructor(private http: Http) {
    this.microrregiaoURL = '../assets/data/microrregioes/';
    this.mesorregiaoURL = '../assets/data/mesorregioes/';
    this.coordenadasURL = '../assets/data/coordenadas/';
    this.estadosURL = '../assets/data/';
  }

  getEstado (codigo_estado: number) {
    return this.http.get(`${this.coordenadasURL}${codigo_estado}.json`)
      .map((response) => response.json());
  }

  listEstados () {
    return this.http.get(`${this.estadosURL}estados.json`)
      .map((response) => response.json());
  }

  listMicrorregioes(estado: number) {
    return this.http.get(`${this.microrregiaoURL}${estado}.json`)
    .map((response) => response.json());
  }

  listMesorregioes(estado: number) {
    return this.http.get(`${this.mesorregiaoURL}${estado}.json`)
    .map((response) => response.json());
  }

}
