export interface ICoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitudeAccuracy?: number | null | undefined;
  speed?: number | null;
  heading?: number | null;
}
