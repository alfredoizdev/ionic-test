import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CheckInPage } from './check-in.page';
import { PhotoService } from 'src/app/services/photo.service';
import { ApiService } from 'src/app/services/api.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

describe('CheckInPage', () => {
  let component: CheckInPage;
  let fixture: ComponentFixture<CheckInPage>;
  let mockPhotoService: Partial<PhotoService>;
  let mockApiService: Partial<ApiService>;
  let geoService: GeolocationService;

  beforeEach(() => {
    mockPhotoService = {
      getPhoto: jasmine
        .createSpy('getPhoto')
        .and.returnValue(Promise.resolve({})),
    };

    mockApiService = {
      uploadImage: jasmine.createSpy('uploadImage').and.returnValue(of({})),
      checkIn: jasmine.createSpy('checkIn').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [CheckInPage],
      providers: [
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: ApiService, useValue: mockApiService },
      ],
      imports: [IonicModule.forRoot()],
    });

    fixture = TestBed.createComponent(CheckInPage);

    component = fixture.componentInstance;

    geoService = TestBed.inject(GeolocationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPhoto', () => {
    it('should set photo and preview properties when photo is captured', async () => {
      const mockPhoto = {
        base64String: 'mockBase64String',
      };
      (mockPhotoService.getPhoto as jasmine.Spy).and.returnValue(
        Promise.resolve(mockPhoto)
      );

      await component.getPhoto();

      expect(component.photo).toEqual(mockPhoto as any);
      expect(component.preview).toContain(
        'data:image/png;base64,' + mockPhoto.base64String
      );
    });
  });

  it('should get a photo and upload it', async () => {
    await component.getPhoto();

    expect(mockPhotoService.getPhoto).toHaveBeenCalled();

    expect(mockApiService.uploadImage).toHaveBeenCalledWith(
      component.photo?.base64String
    );
  });

  it('should handle photo fetching error', async () => {
    const errorMessage = 'Failed to fetch photo';
    (mockPhotoService.getPhoto as jasmine.Spy).and.returnValue(
      Promise.reject(new Error(errorMessage))
    );

    await component.getPhoto();

    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should get location and check in', async () => {
    const expectedValue = {
      user_id: 1522,
      lat: 123,
      lng: 456,
      precision: 10,
      media_id: 'abc123',
      comment: 'This is a comment',
    };

    spyOn(geoService, 'getCurrentPosition').and.returnValue(
      Promise.resolve({ latitude: 123, longitude: 456, accuracy: 10 }) as any
    );

    await component.checkIn();

    expect(mockApiService.checkIn).toHaveBeenCalledWith(expectedValue);
  });

  it('should handle location error', async () => {
    spyOn(geoService, 'getCurrentPosition').and.returnValue(
      Promise.reject(new Error('Location error occurred!'))
    );

    await component.getLocation();

    expect(component.errorMessage).toBe('Location error occurred!');
  });

  it('should handle API error during check-in', async () => {
    spyOn(geoService, 'getCurrentPosition').and.returnValue(
      Promise.resolve({ latitude: 123, longitude: 456, accuracy: 10 }) as any
    );
    const errorMessage = 'API error occurred!';

    (mockApiService.checkIn as jasmine.Spy).and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    await component.checkIn();

    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should set error message if geolocation is not available', async () => {
    spyOn(geoService, 'getCurrentPosition').and.returnValue(
      Promise.resolve(null) as any
    );

    await component.checkIn();

    expect(component.errorMessage).toBe('No coordinates found');
  });
});
