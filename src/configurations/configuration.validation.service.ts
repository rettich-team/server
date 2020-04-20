import { Injectable } from '@nestjs/common';
import { AnySchema, ValidationResult, ValidationError } from '@hapi/joi';

@Injectable()
export class ConfigurationValidationService {
    public validateValue<TValue>(value: TValue, validator: AnySchema, property: string): void {
        const validationSchema: AnySchema = validator.label(property);
        const validationResult: ValidationResult = validationSchema.validate(value);
        const validationError: ValidationError = validationResult.error;

        if (validationError) {
            throw validationError;
        }
    }
}