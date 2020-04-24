import { distanceFromCoordinatesInKilometers } from './distanceFromCoordinatesInKilometers';

describe('distanceFromCoordinatesInKilometers', () => {
    it('returns the distance from 2 locations in kilometers', () => {
        expect(distanceFromCoordinatesInKilometers(1, 1, 2, 2)).toBe(157.22543203807288);
    });
});
