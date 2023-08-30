import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { ICoords } from 'src/interfaces/Geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  async getCurrentPosition(): Promise<ICoords> {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }
}
