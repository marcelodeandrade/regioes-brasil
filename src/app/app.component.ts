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

  constructor(private dataService: DataService, private mapService: MapService) {}

  ngOnInit(): void {

    this.dataService.getEstado(27).subscribe(estado => {
      console.log(estado);
    })

    this.map = this.mapService.createMap([-46.625290, -23.533773]);

  }

}
