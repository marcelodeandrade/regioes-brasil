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
  ) {}

  reverseGeocoding(latitude, longitude) {
    return Observable.create(observer => {
      this.gmapsLoader.load().then(() => {
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
    });
  }

  isEstado(address) {
    return address.types.includes('administrative_area_level_1') && address.types.includes('political');
  }

  getGeocoderAddressUF(geocoderAddress) {
    let uf = geocoderAddress.address_components.filter((address) => {
      return this.isEstado(address);
    }).map(estado => {
      return estado.short_name;
    })[0];

    return uf;
  }

}
