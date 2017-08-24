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
    const data = [];

    this.http.get(`${this.estadosURL}estados.json`)
    .map((response) => response.json())
    .subscribe(estados => {
      estados.map(estado => {
        data.push({codigo: estado.codigo, nome: estado.nome});
      });
    });

    return data;
  }

  listMicrorregioes(estado: number) {
    const data = [];

    this.http.get(`${this.microrregiaoURL}${estado}.json`)
    .map((response) => response.json())
    .subscribe(micros => {
      micros.map(micro => {
        data.push({codigo: micro.codigo, nome: micro.nome});
      });
    });

    return data;
  }

  listMesorregioes(estado: number) {
    const data = [];

    this.http.get(`${this.mesorregiaoURL}${estado}.json`)
    .map((response) => response.json())
    .subscribe(mesos => {
      mesos.map(meso => {
        data.push({codigo: meso.codigo, nome: meso.nome});
      });
    });

    return data;
  }

}
