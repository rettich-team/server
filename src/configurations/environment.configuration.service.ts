import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

@Injectable()
export class EnvironmentConfigurationService extends BaseConfigurationService {
    public readonly environment: string;

    constructor(
        protected readonly configService: ConfigService, 
        protected readonly schemaValidationService: SchemaValidationService,
    ) {
        super(configService, schemaValidationService, [{
            field: 'environment',
            environmentKey: 'NODE_ENV',
            validator: Joi.string().valid('development', 'production', 'test').required(),
        }]);
    }
}
