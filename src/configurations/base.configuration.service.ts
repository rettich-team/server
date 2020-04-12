import { ConfigService } from '@nestjs/config';
import { AnySchema, ValidationResult, ValidationError } from '@hapi/joi';

export abstract class BaseConfigurationService {
    constructor(protected readonly configService: ConfigService) {}

    protected constructValue(key: string, validator: AnySchema): string {
        const rawValue: string = this.configService.get(key);

        this.validateValue(rawValue, validator);

        return rawValue;
    }

    protected constructAndParseValue<TResult>(key: string, validator: AnySchema, parser: (rawValue: string) => TResult): TResult {
        const rawValue: string = this.configService.get(key);
        const parsedValue: TResult = parser(rawValue);

        this.validateValue(parsedValue, validator);
        
        return parsedValue;
    }

    private validateValue<TValue>(value: TValue, validator: AnySchema): void {
        const validationResult: ValidationResult = validator.validate(value);
        const validationError: ValidationError = validationResult.error;

        if (validationError) {
            throw validationError;
        }
    }
}
