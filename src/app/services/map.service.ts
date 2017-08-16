import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ol from 'openlayers';

@Injectable()
export class MapService {

  raster: any;
  style: any;
  vector: any;
  map: any;

  constructor(private http: Http, private dataService: DataService) { }

  initStyle() {

    this.style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new ol.style.Stroke({
        color: '#319FD3',
        width: 1
      })
    });

  }

  initVector(cod) {

    this.vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: `../assets/data/coordenadas/${cod}.json`,
        format: new ol.format.TopoJSON(),
        overlaps: false,
      }),
      style: this.style
    });

  }

  createMap(estado, lonLat) {

    this.initStyle();
    this.initVector(estado);

    this.listMicrorregioes(estado);

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
        , this.vector
      ],
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat(lonLat),
        zoom: 4
      })
    });

    return this.map;
  }

  listEstados() {

    let listEstados = new Array();

    this.dataService.listEstados().subscribe(micro => {
      micro.forEach(element => {
        listEstados.push({codigo: element.codigo, nome: element.nome});
      });
    });

    return listEstados;

  }

  listMesorregioes(estado: number) {

    let listMesorregioes = new Array();

    this.dataService.listMesorregioes(estado).subscribe(micro => {
      micro.forEach(element => {
        listMesorregioes.push({codigo: element.codigo, nome: element.nome});
      });
    });

    return listMesorregioes;

  }

  listMicrorregioes(estado: number) {

    let listMicrorregioes = new Array();

    this.dataService.listMicrorregioes(estado).subscribe(micro => {
      micro.forEach(element => {
        listMicrorregioes.push({codigo: element.codigo, nome: element.nome});
      });
    });

    return listMicrorregioes;

  }

  unsetMunicipios(topoJSON, codigo_estado, municipios) {
    let geometries = topoJSON.objects[codigo_estado]['geometries'];

    // if (municipios != null) {
    //     let municipiosArr = [];

    //     $.each(JSON.parse(municipios), function(idx, obj) {
    //       municipiosArr.push(obj.codigo);
    //     });

    //   for(var i = geometries.length -1; i >= 0 ; i--){
    //     let cod = geometries[i].properties.cod;
    //     if($.inArray(cod.toString(), municipiosArr) < 0){
    //           geometries.splice(i, 1);
    //     }
    //   }
    // }
  }

}
