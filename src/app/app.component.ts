import { GMapsService } from './services/gmaps.service';
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

  selectedEstado: number = 0;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private geolocationService: GeolocationService,
    private gmapsService: GMapsService
  ) {}

  ngOnInit(): void {

    this.estadosList = this.dataService.listEstados();
    this.createMap();

    this.geolocationService.getLocation([]).subscribe((position) => {
        this.location = [position.coords.longitude, position.coords.latitude];

        this.gmapsService.reverseGeocoder(position.coords.latitude, position.coords.longitude).subscribe((addressListGeocoder) => {

          let uf = this.gmapsService.getGeocoderAddressUF(addressListGeocoder);
          this.selectedEstado = this.dataService.getCodigoByUF(uf, this.estadosList);
          this.refreshMap();

        });

    });

  }

  onSelect(estado) {
    this.selectedEstado = estado;
    this.location = this.dataService.getCapitalLatLon(estado, this.estadosList);
    this.mesorregioesList = this.dataService.listMesorregioes(estado);
    this.microrregioesList = this.dataService.listMicrorregioes(estado);

    this.refreshMap();
  }

  createMap() {
    this.map = this.mapService.createMap();
  }

  refreshMap() {
    this.mapService.refreshMap({
      'estado': this.selectedEstado,
      'latLng': this.location
    });
  }

}
