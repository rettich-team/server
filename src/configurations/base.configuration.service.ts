import { ConfigService } from '@nestjs/config';
import { AnySchema } from '@hapi/joi';

import { ConfigurationValidationService } from './configuration.validation.service';

export abstract class BaseConfigurationService {
    constructor(
        protected readonly configService: ConfigService,
        protected readonly configurationValidationService: ConfigurationValidationService
    ) {}

    protected constructValue(key: string, validator: AnySchema): string {
        const rawValue: string = this.configService.get(key);

        this.configurationValidationService.validateValue(rawValue, validator, key);

        return rawValue;
    }

    protected constructAndParseValue<TResult>(key: string, validator: AnySchema, parser: (value: string) => TResult): TResult {
        const rawValue: string = this.configService.get(key);
        const parsedValue: TResult = parser(rawValue);

        this.configurationValidationService.validateValue(parsedValue, validator, key);
        
        return parsedValue;
    }
}
