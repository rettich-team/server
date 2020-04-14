import { ConfigService } from '@nestjs/config';
import { AnySchema, ValidationResult, ValidationError } from '@hapi/joi';

export abstract class BaseConfigurationService {
    constructor(protected readonly configService: ConfigService) {}

    protected constructValue(key: string, validator: AnySchema): string {
        const rawValue: string = this.configService.get(key);

        this.validateValue(rawValue, validator, key);

        return rawValue;
    }

    protected constructAndParseValue<TResult>(key: string, validator: AnySchema, parser: (value: string) => TResult): TResult {
        const rawValue: string = this.configService.get(key);
        const parsedValue: TResult = parser(rawValue);

        this.validateValue(parsedValue, validator, key);
        
        return parsedValue;
    }

    private validateValue<TValue>(value: TValue, validator: AnySchema, label: string): void {
        const validationSchema: AnySchema = validator.label(label);
        const validationResult: ValidationResult = validationSchema.validate(value);
        const validationError: ValidationError = validationResult.error;

        if (validationError) {
            throw validationError;
        }
    }
}
