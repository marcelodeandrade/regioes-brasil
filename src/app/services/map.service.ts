import { LatLng } from '@agm/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ol from 'openlayers';

@Injectable()
export class MapService {

  style: ol.style.Style;
  vector: ol.layer.Vector;
  vectorSource: ol.source.Vector;
  view: ol.View;
  map: ol.Map;

  constructor(private http: Http, private dataService: DataService) {}

  refreshMap(options) {

    this.dataService.getEstado(options.estado).subscribe(topoJSONSource => {

      this.unsetMunicipios(topoJSONSource, options);

      this.map.removeLayer(this.vector);

      this.vectorSource = new ol.source.Vector({
        features: (new ol.format.TopoJSON()).readFeatures(topoJSONSource),
      });

      this.vector = new ol.layer.Vector({
        source: this.vectorSource,
        style: this.style
      });

      this.map.addLayer(this.vector);

      this.view.animate({zoom: 8}, {center: ol.proj.transform(options.latLng, 'EPSG:4326',
      'EPSG:4326')});

    });
    }

  createMap() {

    this.style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new ol.style.Stroke({
        color: '#319FD3',
        width: 1
      })
    });

    this.vectorSource = new ol.source.Vector();

    this.vector = new ol.layer.Vector({
      source: this.vectorSource,
      style: this.style
    });

    this.view = new ol.View({
      projection: 'EPSG:4326',
      center: ol.proj.transform([-47.93, -15.78], 'EPSG:4326',
      'EPSG:4326'),
      zoom: 4
    });

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM({
              url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
              attributions: [
                  new ol.Attribution({ html: '© Google' }),
                  new ol.Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
              ]
          })
      }),
      this.vector
      ],
      target: 'map',
      view: this.view
    });

    return this.map;
  }

  unsetMunicipios(topoJSONSource, options) {

    const geometries = topoJSONSource.objects[options.estado]['geometries'];
    const municipios = options.municipios;

    if (!municipios) {
      return;
    }

    const newGeometries = geometries.filter((elem, i, array) => {
      if (municipios.indexOf(elem.properties.cod.toString()) > -1) {
        return array[i];
      };
    });

    topoJSONSource.objects[options.estado]['geometries'] = newGeometries;

  }

}
