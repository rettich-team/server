import { square } from './square';

describe('square', () => {
    it('returns the square number 9 of 3', () => {
        expect(square(3)).toBe(9);
    });
});
