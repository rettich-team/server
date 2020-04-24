import { degreesToRadians } from './degreesToRadians';

describe('degreesToRadians', () => {
    it('converts degrees to radians', () => {
        expect(degreesToRadians(30)).toBe(0.5235987755982988);
    });
});
