import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#uploadImage', () => {
    it('should return an Observable<Object>', () => {
      const dummyResponse: any = { status: 'success' };
      const image = 'test_image_string';

      service.uploadImage(image).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/media`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.image).toBe(image);
      req.flush(dummyResponse);
    });
  });

  describe('#checkIn', () => {
    it('should return an Observable<Object>', () => {
      const dummyResponse = { status: 'checked_in' };
      const data = { testKey: 'testValue' };

      service.checkIn(data).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/check-in`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(data);
      req.flush(dummyResponse);
    });
  });
});
