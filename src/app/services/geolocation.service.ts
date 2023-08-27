import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  async getCurrentPosition(): Promise<any> {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }
}
