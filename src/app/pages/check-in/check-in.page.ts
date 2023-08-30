import { Component } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ICoords } from 'src/interfaces/Geolocation';
import { IMedia } from 'src/interfaces/Media';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  photo?: Photo;
  loading = false;
  preview?: string;
  mediaInfo: IMedia = {
    owner_id: 'b579b9bd-bf25-418e-a219-dd7aef410e6f',
    path: 'cf/media',
    media_type: 'image',
    extension: '',
    mime: 'image/png',
    disk: 's3',
    id: 'abc123',
    updated_at: '2023-08-23T16:33:45.000000Z',
    created_at: '2023-08-23T16:33:45.000000Z',
  };
  coords?: ICoords;
  errorMessage = '';

  constructor(
    public photoService: PhotoService,
    private apiService: ApiService,
    private geolocationService: GeolocationService
  ) {
    this.getLocation();
  }

  async getLocation() {
    try {
      this.coords = await this.geolocationService.getCurrentPosition();
    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  async getPhoto() {
    try {
      this.photo = await this.photoService.getPhoto();
      this.preview = `data:image/png;base64,${this.photo.base64String}`;
      this.mediaInfo = await lastValueFrom(
        this.apiService.uploadImage(this.photo.base64String as string)
      );
      this.errorMessage = 'Image succesfully upload';
    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  async checkIn() {
    this.loading = true;
    try {
      this.coords = await this.geolocationService.getCurrentPosition();
      if (this.coords) {
        await lastValueFrom(
          this.apiService.checkIn({
            user_id: 1522,
            lat: this.coords?.latitude,
            lng: this.coords?.longitude,
            precision: this.coords?.accuracy,
            media_id: this.mediaInfo.id,
            comment: 'This is a comment',
          })
        );
      } else {
        this.errorMessage = 'No coordinates found';
      }
    } catch (e: any) {
      this.errorMessage = e.message;
    } finally {
      this.loading = false;
    }
  }
}
