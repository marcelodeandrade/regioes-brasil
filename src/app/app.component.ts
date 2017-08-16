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
  microrregioes: any;
  mesorregioes: any;
  estados: any;

  selectedEstado: number = 0;

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {
    this.estados = this.mapService.listEstados();
    this.map = this.mapService.createMap(27, [-46.625290, -23.533773]);
  }

  onSelect(estado) {
    this.selectedEstado = estado;
    this.mesorregioes = this.mapService.listMesorregioes(estado);
    this.microrregioes = this.mapService.listMicrorregioes(estado);
  }

}
