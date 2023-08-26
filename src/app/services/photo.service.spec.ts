import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

describe('PhotoService', () => {
  let service: PhotoService;
  let cameraMock: any;

  beforeEach(() => {
    cameraMock = {
      getPhoto: jasmine.createSpy('getPhoto'),
    };

    TestBed.configureTestingModule({
      providers: [PhotoService, { provide: Camera, useValue: cameraMock }],
    });

    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a photo', async () => {
    const mockCapturedPhoto: any = {
      webPath: 'path/to/photo',
      format: 'jpeg',
    };
    cameraMock.getPhoto.and.returnValue(Promise.resolve(mockCapturedPhoto));

    const capturedPhoto = await service.getPhoto();
    expect(capturedPhoto).toEqual(mockCapturedPhoto);

    expect(cameraMock.getPhoto).toHaveBeenCalledWith({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  });

  it('should handle error when getting a photo', async () => {
    const errorMessage = 'Error getting photo';
    cameraMock.getPhoto.and.throwError(errorMessage);

    try {
      await service.getPhoto();
    } catch (error: any) {
      expect(error.message).toBe(errorMessage);
    }

    expect(cameraMock.getPhoto).toHaveBeenCalledWith({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  });
});
