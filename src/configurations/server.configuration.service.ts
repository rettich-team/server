import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { ConfigurationValidationService } from './configuration.validation.service';

@Injectable()
export class ServerConfigurationService extends BaseConfigurationService {
    public readonly port: number;
    
    constructor(
        protected readonly configService: ConfigService,
        protected readonly configurationValidationService: ConfigurationValidationService
    ) {
        super(configService, configurationValidationService);
        this.port = this.constructAndParseValue<number>(
            'SERVER_PORT', 
            Joi.number().port().required(), 
            Number
        );
    }
}
