import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';
import { Geolocation } from '@capacitor/geolocation';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let geolocationMock: any;

  beforeEach(() => {
    geolocationMock = {
      getCurrentPosition: jasmine.createSpy('getCurrentPosition'),
    };

    TestBed.configureTestingModule({
      providers: [
        GeolocationService,
        { provide: Geolocation, useValue: geolocationMock },
      ],
    });

    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current position', async () => {
    const mockCoordinates: any = {
      coords: { latitude: 123, longitude: 456, accuracy: 10 },
    };
    geolocationMock.getCurrentPosition.and.returnValue(
      Promise.resolve(mockCoordinates)
    );

    const coordinates = await service.getCurrentPosition();
    expect(coordinates).toEqual(mockCoordinates);

    expect(geolocationMock.getCurrentPosition).toHaveBeenCalled();
  });

  it('should handle error when getting current position', async () => {
    const errorMessage = 'Error getting position';
    geolocationMock.getCurrentPosition.and.throwError(errorMessage);

    try {
      await service.getCurrentPosition();
    } catch (error: any) {
      expect(error.message).toBe(errorMessage);
    }

    expect(geolocationMock.getCurrentPosition).toHaveBeenCalled();
  });
});
