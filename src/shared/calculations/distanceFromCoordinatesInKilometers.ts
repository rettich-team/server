import { degreesToRadians } from './degreesToRadians';
import { square } from './square';

export function distanceFromCoordinatesInKilometers(latitudeStart: number, longitudeStart: number, latitudeEnd: number, longitudeEnd: number): number {
    const distanceOfLatitudesInDegrees: number = latitudeEnd - latitudeStart;
    const distanceOfLatitudesInRadians: number = degreesToRadians(distanceOfLatitudesInDegrees);
    
    const distanceOfLongitudesInDegrees: number = longitudeEnd - longitudeStart;
    const distanceOfLongitudesInRadians: number = degreesToRadians(distanceOfLongitudesInDegrees);
    
    const latitudeStartInRadians: number = degreesToRadians(latitudeStart);
    const latitudeEndInRadians: number = degreesToRadians(latitudeEnd);
    
    const halfDistanceOfLatitudesInRadians: number = distanceOfLatitudesInRadians * 0.5;
    const halfDistanceOfLongitudesInRadians: number = distanceOfLongitudesInRadians * 0.5;
    
    const halfLapsAroundGlobe: number = square(Math.sin(halfDistanceOfLatitudesInRadians)) +
                                        Math.cos(latitudeStartInRadians) * 
                                        Math.cos(latitudeEndInRadians) * 
                                        square(Math.sin(halfDistanceOfLongitudesInRadians));
    
    const angularDistanceInRadians: number = 2 * Math.atan2(Math.sqrt(halfLapsAroundGlobe), Math.sqrt(1- halfLapsAroundGlobe));
    
    const earthRadiusInKilometers = 6371;
    
    return earthRadiusInKilometers * angularDistanceInRadians;
}