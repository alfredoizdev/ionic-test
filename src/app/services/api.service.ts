import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(image: string): Observable<Object> {
    return this.httpClient.post('https://testing.caredfor.com/media', {
      image,
    });
  }

  checkIn(data: any): Observable<Object> {
    return this.httpClient.post('https://testing.caredfor.com/check-in', data);
  }
}
