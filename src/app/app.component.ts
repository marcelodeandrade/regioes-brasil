import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import * as ol from 'openlayers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  map: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.getEstado(27).subscribe(estado => {
      console.log(estado);
    })

     var raster = new ol.layer.Tile({
			source: new ol.source.OSM()
		});

      var style = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 1
        })
      });

      var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: '../assets/data/estados/27.json',
          format: new ol.format.TopoJSON(),
          overlaps: false,
        }),
        style: style
      });

      var map = new ol.Map({
        layers: [raster, vector],
        target: 'map',
        view: new ol.View({
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([-46.625290, -23.533773]),
          zoom: 4
        })
      });

  }

}
