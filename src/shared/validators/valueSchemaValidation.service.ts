import { Injectable } from '@nestjs/common';
import { AnySchema, ValidationResult, ValidationError } from '@hapi/joi';

@Injectable()
export class ValueSchemaValidationService {
    public validateValue<TValue>(value: TValue, validator: AnySchema, valueName?: string): void {
        if (valueName) {
            validator = validator.label(valueName);
        }
        
        const validationResult: ValidationResult = validator.validate(value);
        const validationError: ValidationError = validationResult.error;

        if (validationError) {
            throw validationError;
        }
    }
}