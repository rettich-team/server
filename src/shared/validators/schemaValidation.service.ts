import { Injectable } from '@nestjs/common';
import { AnySchema, ValidationResult, ValidationError } from '@hapi/joi';

@Injectable()
export class SchemaValidationService {
    public validate(value: any, schema: AnySchema): void {
        const validationResult: ValidationResult = schema.validate(value, { abortEarly: false });
        const validationError: ValidationError = validationResult.error;
    
        if (validationError) {
            throw validationError;
        }
    }
}