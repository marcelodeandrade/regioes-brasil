import { GMapsService } from './services/gmaps.service';
import { GeolocationService } from './services/geolocation.service';
import { MapService } from './services/map.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { SortPipe } from './pipes/sort.pipe';

import { MdSelectModule, MdToolbarModule, MdCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg9qbQOcGXasYsFBJUUerf7l5a5ZtB9WQ'
    }),
    MdSelectModule, MdToolbarModule, MdCardModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, MapService, GeolocationService, GMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
