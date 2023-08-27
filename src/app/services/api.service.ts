import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(image: string): Observable<Object> {
    console.log(image);
    return this.httpClient.post(`${environment.baseUrl}/media`, {
      image,
    });
  }

  checkIn(data: any): Observable<Object> {
    return this.httpClient.post(`${environment.baseUrl}/check-in`, data);
  }
}
