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

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {

    this.microrregioes = this.mapService.listMicrorregioes(27);
    this.mesorregioes = this.mapService.listMesorregioes(27);
    this.map = this.mapService.createMap(27, [-46.625290, -23.533773]);
  }

}
