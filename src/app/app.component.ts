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

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {
    this.estadosList = this.mapService.listEstados();
    this.map = this.mapService.createMap(27, [-46.625290, -23.533773]);
  }

  onSelect(estado) {
    this.selectedEstado = estado;
    this.mesorregioesList = this.mapService.listMesorregioes(estado);
    this.microrregioesList = this.mapService.listMicrorregioes(estado);
  }

}
