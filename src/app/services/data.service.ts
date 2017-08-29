import { LatLng } from '@agm/core';
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
  divisoesRegionaisURL: string;

  constructor(private http: Http) {
    this.microrregiaoURL = '../assets/data/microrregioes/';
    this.mesorregiaoURL = '../assets/data/mesorregioes/';
    this.coordenadasURL = '../assets/data/coordenadas/';
    this.estadosURL = '../assets/data/';
    this.divisoesRegionaisURL = '../assets/data/divisoes-regionais/';
  }

  getEstado (codigo_estado: number) {
    return this.http.get(`${this.coordenadasURL}${codigo_estado}.json`)
      .map((response) => response.json());
  }

  listEstados(): Array<Object> {
    const data = [];

    this.http.get(`${this.estadosURL}estados.json`)
    .map((response) => response.json())
    .subscribe(estados => {
      estados.map(estado => {
        data.push({
          codigo: estado.codigo,
          nome: estado.nome,
          uf: estado.uf,
          latLng: estado.capital.latLng
        });
      });
    });
    return data;
  }

  listRegioesIntermediarias(estado: number): Array<Object> {
    const data = [];

    this.http.get(`${this.divisoesRegionaisURL}${estado}.json`)
    .map((response) => response.json())
    .subscribe(regioes => {
      console.log(regioes);
      regioes.regioes_intermediarias.map(regiao => {
        data.push({codigo: regiao.codigo_regiao_intermediaria, nome: regiao.nome_regiao_intermediaria});
      });
    });

    return data;
  }

  listRegioesImediatas(estado: number, regiaoIntermediaria: number): Array<Object> {
    const data = [];

    this.http.get(`${this.divisoesRegionaisURL}${estado}.json`)
    .map((response) => response.json())
    .subscribe(regioes => {
      regioes.regioes_intermediarias.map(regiao => {
        if (regiao.codigo_regiao_intermediaria === regiaoIntermediaria) {
          regiao.regioes_imediatas.map(imediata => {
            data.push({codigo: imediata.codigo_regiao_imediata, nome: imediata.nome_regiao_imediata});
          });
        }
      });
    });

    return data;
  }

  getCodigoByUF(uf, estadosList) {
    return estadosList.filter((estado) => {
      return estado.uf.includes(uf);
    }).map(estado => estado.codigo)[0];
  }

  getCapitalLatLng(codigo, estadosList) {
    return estadosList.filter((estado) => {
      return estado.codigo.includes(codigo);
    }).map(estado => {return estado.latLng})[0].reverse();
  }

}
