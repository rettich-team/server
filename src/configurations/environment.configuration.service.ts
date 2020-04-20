import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { ConfigurationValidationService } from './configuration.validation.service';

@Injectable()
export class EnvironmentConfigurationService extends BaseConfigurationService {
    public readonly environment: string;
    
    constructor(
        protected readonly configService: ConfigService,
        protected readonly configurationValidationService: ConfigurationValidationService
    ) {
        super(configService, configurationValidationService);
        this.environment = this.constructValue(
            'NODE_ENV', 
            Joi.string().valid('development', 'production', 'test').required()
        );
    }
}
