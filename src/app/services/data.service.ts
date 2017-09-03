import { LatLng } from '@agm/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  constructor(private http: Http) {}

  getEstado (codigo_estado: number) {
    return this.http.get(`../assets/data/coordenadas/${codigo_estado}.json`)
      .map((response) => response.json());
  }

  listEstados(): Array<Object> {
    const data = [];

    this.http.get('../assets/data/estados.json')
    .map((response) => response.json())
    .subscribe(estados => {
      estados.map(estado => {
        data.push({
          codigo: estado.codigo,
          nome: estado.nome,
          uf: estado.uf,
          latLng: estado.capital.latLng.reverse()
        });
      });
    });
    return data;
  }

  listRegioesIntermediarias(estado: number): Array<Object> {
    const data = [];

    this.http.get(`../assets/data/regioes.intermediarias.json`)
    .map((response) => response.json())
    .subscribe(regioes => {
      regioes[estado].map(regiao => {
        data.push({codigo: regiao.codigo, nome: regiao.nome});
      });
    });

    return data;
  }

  listRegioesImediatas(regiaoIntermediaria: number): Array<Object> {
    const data = [];

    this.http.get(`../assets/data/regioes.imediatas.json`)
    .map((response) => response.json())
    .subscribe(regioes => {
      regioes[regiaoIntermediaria].map(regiao => {
        data.push({codigo: regiao.codigo, nome: regiao.nome});
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
    }).map(estado => { return estado.latLng; })[0];
  }

  listMunicipios(options) {
    return this.http.get('../assets/data/municipios.json')
    .map((response) => response.json());

  }

}
