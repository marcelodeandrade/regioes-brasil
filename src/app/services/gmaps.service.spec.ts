/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GMapsService } from './gmaps.service';

describe('GMapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GMapsService]
    });
  });

  it('should ...', inject([GMapsService], (service: GMapsService) => {
    expect(service).toBeTruthy();
  }));
});
