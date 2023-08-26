import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

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
    httpMock.verify(); // Verify that no outstanding requests are present
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload an image', () => {
    const image = 'base64-encoded-image';

    service.uploadImage(image).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://testing.caredfor.com/media');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ image });

    req.flush({}); // Simulate a successful response
  });

  it('should check in', () => {
    const data = {
      user_id: 123,
      lat: 45.678,
      lng: -90.123,
      precision: 5,
      media_id: 'abc123',
      comment: 'This is a comment',
    };

    service.checkIn(data).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://testing.caredfor.com/check-in');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);

    req.flush({}); // Simulate a successful response
  });
});
