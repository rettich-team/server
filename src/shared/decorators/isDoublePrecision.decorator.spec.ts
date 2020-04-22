import { IsDoublePrecisionConstraint } from './isDoublePrecision.decorator';

describe('IsDoublePrecisionConstraint', () => {
    let isDoublePrecisionConstraint: IsDoublePrecisionConstraint;
    
    beforeEach(async () => {
        isDoublePrecisionConstraint = new IsDoublePrecisionConstraint();
    });

    it('should be defined', () => {
        expect(isDoublePrecisionConstraint).toBeDefined();
    });

    describe('validation', () => {
        it('returns false if the value is not a number', () => {
            const validationResult: boolean = isDoublePrecisionConstraint.validate('not a number'); 
            
            expect(validationResult).toBeFalsy();
        });

        it('returns true if the value is an integer', () => {
            const validationResult: boolean = isDoublePrecisionConstraint.validate(3); 
            
            expect(validationResult).toBeTruthy();
        });

        it('returns false if the value has more than 15 decimal digits', () => {
            const validationResult: boolean = isDoublePrecisionConstraint.validate(0.0123456789123456); 
            
            expect(validationResult).toBeFalsy();
        });

        it('returns true if the value has less than 15 decimal digits', () => {
            const validationResult: boolean = isDoublePrecisionConstraint.validate(0.01); 
            
            expect(validationResult).toBeTruthy();
        });

        it('returns true if the value has equal to 15 decimal digits', () => {
            const validationResult: boolean = isDoublePrecisionConstraint.validate(0.012345678912345); 
            
            expect(validationResult).toBeTruthy();
        });
    });

    describe('default message', () => {
        it('starts the message with the property name', () => {
            const property = 'field';
            
            const defaultMessage: string = isDoublePrecisionConstraint.defaultMessage({ 
                value: null, 
                constraints: null,
                targetName: '',
                object: null,
                property
            });

            expect(defaultMessage.startsWith(property)).toBeTruthy();
        });
    });
});
