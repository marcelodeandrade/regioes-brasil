import { GeolocationService } from './services/geolocation.service';
import { MapService } from './services/map.service';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  map: any;
  location: any;
  microrregioesList: any;
  mesorregioesList: any;
  estadosList: any;

  selectedEstado: number = 27;

  constructor(private dataService: DataService, private mapService: MapService, private geolocationService: GeolocationService) {}

  ngOnInit(): void {

    this.geolocationService.getLocation([]).subscribe((position) => {
        this.location = [position.coords.longitude, position.coords.latitude];
    });

    this.estadosList = this.mapService.listEstados();
    this.createMap();
  }

  onSelect(estado) {
    this.selectedEstado = estado;
    this.mesorregioesList = this.mapService.listMesorregioes(estado);
    this.microrregioesList = this.mapService.listMicrorregioes(estado);
    this.refreshMap();
  }

  createMap() {
    this.map = this.mapService.createMap(this.selectedEstado, [-35.659207, -9.373628]);
  }

  refreshMap() {
    this.mapService.refreshMap(this.selectedEstado);
  }
}
