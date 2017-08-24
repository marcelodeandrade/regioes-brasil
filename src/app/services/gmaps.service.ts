import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { LatLng, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class GMapsService {

  geocoder: any;

  constructor(
    private gmapsLoader: MapsAPILoader,
    private dataService: DataService
  ) {
    this.gmapsLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  reverseGeocoding(latitude, longitude) {
    return Observable.create(observer => {
      try {
          let latLng = new google.maps.LatLng(latitude, longitude);
          this.geocoder.geocode({'latLng': latLng}, (results, status) => {
            observer.next(results);
            observer.complete();
          });

      } catch (error) {
        observer.error('error getGeocoding' + error);
        observer.complete();
      }
    });
  }

  isEstado(address_components) {
    return address_components.types.includes('administrative_area_level_1') && address_components.types.includes('political');
  }

  getGeocoderAddressUF(geocoderAddress) {
    let uf;

    geocoderAddress.map(function(address) {
      address.address_components.filter( function( elem, i, array ) {
        if(this.isEstado(elem)) {
          uf = elem.shortname;
        }
      });
    });

    return uf;
  }

  getCodigoByUF(uf) {
    let codigo;

     this.dataService.listEstados().subscribe(estados => {
      codigo = estados.filter((estado) => {
          return estado.uf.includes(uf);
        }).map((estado) => {
          return estado.codigo;
        })[0];
    });

    return codigo;
  }

}
