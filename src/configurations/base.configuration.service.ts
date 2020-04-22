import { ConfigService } from '@nestjs/config';
import { AnySchema } from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

export abstract class BaseConfigurationService {
    constructor(
        protected readonly configService: ConfigService,
        protected readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {}

    protected constructValue(key: string, validator: AnySchema): string {
        const rawValue: string = this.configService.get(key);

        this.valueSchemaValidationService.validateValue(rawValue, validator, key);

        return rawValue;
    }

    protected constructAndParseValue<TResult>(key: string, validator: AnySchema, parser: (value: string) => TResult): TResult {
        const rawValue: string = this.configService.get(key);
        const parsedValue: TResult = parser(rawValue);

        this.valueSchemaValidationService.validateValue(parsedValue, validator, key);
        
        return parsedValue;
    }
}
