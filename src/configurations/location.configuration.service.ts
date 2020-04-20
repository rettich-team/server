import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { ConfigurationValidationService } from './configuration.validation.service';

@Injectable()
export class LocationConfigurationService extends BaseConfigurationService {
    public readonly descriptionMaxLength: number;
    
    constructor(
        protected readonly configService: ConfigService,
        protected readonly configurationValidationService: ConfigurationValidationService
    ) {
        super(configService, configurationValidationService);
        this.descriptionMaxLength = this.constructAndParseValue<number>(
            'LOCATION_DESCRIPTION_MAX_LENGTH',
            Joi.number().integer().required(), 
            Number
        );
    }
}
