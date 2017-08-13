import { Injectable } from '@angular/core';
import * as ol from 'openlayers';

@Injectable()
export class MapService {

  raster: any;
  style: any;
  vector: any;
  map: any;

  constructor() { }

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

  createMap(lonLat) {

    this.initStyle();
    this.initVector(27);

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

}
