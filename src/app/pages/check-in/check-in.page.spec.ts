import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { CheckInPage } from './check-in.page';
import { PhotoService } from 'src/app/services/photo.service';
import { ApiService } from 'src/app/services/api.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

describe('CheckInPage', () => {
  let component: CheckInPage;
  let fixture: ComponentFixture<CheckInPage>;
  let mockPhotoService: Partial<PhotoService>;
  let mockApiService: Partial<ApiService>;
  let mockGeolocationService: any;

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

    mockGeolocationService = {
      getCurrentPosition: jasmine
        .createSpy('getCurrentPosition')
        .and.returnValue(
          Promise.resolve({
            coords: { latitude: 123, longitude: 456, accuracy: 10 },
          })
        ),
    };

    TestBed.configureTestingModule({
      declarations: [CheckInPage],
      providers: [
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: ApiService, useValue: mockApiService },
        { provide: GeolocationService, useValue: mockGeolocationService },
      ],
      imports: [IonicModule.forRoot()],
    });

    fixture = TestBed.createComponent(CheckInPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a photo and upload it', async () => {
    await component.getPhoto();
    expect(mockPhotoService.getPhoto).toHaveBeenCalled();
    expect(mockApiService.uploadImage).toHaveBeenCalledWith(
      component.photo?.base64String
    );
  });

  it('should get location and check in', async () => {
    await component.checkIn();
    expect(mockGeolocationService.getCurrentPosition).toHaveBeenCalled();
    expect(mockApiService.checkIn).toHaveBeenCalledWith({
      user_id: 1533,
      lat: 123,
      lng: 456,
      precision: 10,
      media_id: component.mediaInfo.id,
      comment: 'This is a comment',
    });
  });

  it('should handle location error', async () => {
    mockGeolocationService.getCurrentPosition.and.throwError('Location error');
    await component.getLocation();
    expect(component.errorMessage).toBe('Location error');
  });
});
