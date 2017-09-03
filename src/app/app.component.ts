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
  location: Array<number>;
  listEstados: Array<Object>;
  listRegioesIntermediarias: Array<Object>;
  listRegioesImediatas: Array<Object>;
  municipios: any;

  selectedEstado = 0;
  selectedRegiaoIntermediaria = 0;
  selectedRegiaoImediata = 0;

  constructor(
    private dataService: DataService,
    private mapService: MapService,
    private geolocationService: GeolocationService,
    private gmapsService: GMapsService
  ) {}

  ngOnInit(): void {

    this.listEstados = this.dataService.listEstados();
    this.map = this.mapService.createMap();

    // this.geolocationService.getLocation([]).subscribe((position) => {
    //     this.location = [position.coords.longitude, position.coords.latitude];

    //     this.gmapsService.reverseGeocoder(position.coords.latitude, position.coords.longitude).subscribe((addressListGeocoder) => {

    //       const uf = this.gmapsService.getGeocoderAddressUF(addressListGeocoder);
    //       this.selectedEstado = this.dataService.getCodigoByUF(uf, this.listEstados);
    //       this.refreshMap();

    //     });

    // });

  }

  onSelectEstado() {
    this.location = this.dataService.getCapitalLatLng(this.selectedEstado, this.listEstados);
    this.listRegioesIntermediarias = this.dataService.listRegioesIntermediarias(this.selectedEstado);
    this.refreshMap();
  }

  onSelectRegiaoIntermediaria() {
    this.listRegioesImediatas = this.dataService.listRegioesImediatas(this.selectedRegiaoIntermediaria);
    this.refreshMap();
  }

  onSelectRegiaoImediata() {
    this.refreshMap();
  }

  refreshMap() {

    const options = {
      'latLng': this.location,
      'estado': this.selectedEstado,
      'regiaoIntermediaria': this.selectedRegiaoIntermediaria,
      'regiaoImediata': this.selectedRegiaoImediata
    };

    let data = []
    this.dataService.listMunicipios(options).subscribe(municipios => {
      data = municipios;
      if (options.regiaoIntermediaria > 0) {
        data = data.filter((municipio) => {
          return municipio.regiao_intermediaria == options.regiaoIntermediaria;
        });
      }
      if (options.regiaoImediata) {
        data = data.filter((municipio) => {
          return municipio.regiao_imediata == options.regiaoImediata;
        });
      }
      options['municipios'] = data.map(municipio => { return municipio.codigo; });

      this.mapService.refreshMap(options);
    });
  }

}
