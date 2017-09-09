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
  vectorRegiao: ol.layer.Vector;
  vectorSource: ol.source.Vector;
  vectorSourceRegiao: ol.source.Vector;
  view: ol.View;
  map: ol.Map;
  interaction: ol.interaction.Select;

  constructor(private http: Http, private dataService: DataService) {}

  refreshMap(options) {

    this.dataService.getEstado(options.estado).subscribe(topoJSONSource => {

      const topoJSONSourceRegiao = this.unsetMunicipios(topoJSONSource, options);

      this.map.removeLayer(this.vector);
      this.map.removeLayer(this.vectorRegiao);
      this.map.removeInteraction(this.interaction);

      this.vectorSource = new ol.source.Vector({
        features: (new ol.format.TopoJSON()).readFeatures(topoJSONSource),
      });
      this.vector = new ol.layer.Vector({
        source: this.vectorSource,
        style: this.style
      });
      this.map.addLayer(this.vector);

      if (topoJSONSourceRegiao) {
        this.vectorSourceRegiao = new ol.source.Vector({
          features: (new ol.format.TopoJSON()).readFeatures(topoJSONSourceRegiao),
        });
        this.vectorRegiao = new ol.layer.Vector({
          source: this.vectorSourceRegiao,
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 1)'
            }),
            stroke: new ol.style.Stroke({
              color: '#319FD3',
              width: 1
            })
          })
        });

        this.map.addLayer(this.vectorRegiao);

        this.interaction = new ol.interaction.Select({
          condition: ol.events.condition.pointerMove,
          layers: [this.vectorRegiao]
        });
        this.map.addInteraction(this.interaction);

        const self = this;

        this.interaction.on('select', function(e) {
          if (e.target.getFeatures().getLength()) {

            const codigo = e.target.getFeatures().getArray()[0].getProperties().cod;

            self.dataService.listMunicipios().subscribe(municipios => {
              const municipio = municipios.filter(mun => {
                return mun.codigo == codigo;
              })[0];

              const element = document.getElementById('title');
              element.innerHTML = municipio.nome;
            });
          }
        });

      }

      this.view.animate({zoom: 8}, {center: ol.proj.transform(options.latLng, 'EPSG:4326',
      'EPSG:4326')});

    });
    }

  createMap() {

    this.style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.3)'
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
              url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
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

  unsetMunicipios(source, options) {
    const topoJSONSourceRegiao = JSON.parse(JSON.stringify(source));

    const geometries = topoJSONSourceRegiao.objects[options.estado]['geometries'];

    if (!options.municipiosRegiao) {
      return false;
    }

    const newGeometries = geometries.filter((elem, i, array) => {
      if (options.municipiosRegiao.indexOf(elem.properties.cod) > -1) {
        return array[i];
      };
    });

    topoJSONSourceRegiao.objects[options.estado]['geometries'] = newGeometries;

    return topoJSONSourceRegiao;
  }

}
