import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

@Injectable()
export class LocationConfigurationService extends BaseConfigurationService {
    public readonly descriptionMaxLength: number;

    constructor(
        protected readonly configService: ConfigService, 
        protected readonly schemaValidationService: SchemaValidationService,
    ) {
        super(configService, schemaValidationService, [{
            field: 'descriptionMaxLength',
            environmentKey: 'LOCATION_DESCRIPTION_MAX_LENGTH',
            validator: Joi.number().integer().required(),
            parser: Number,
        }]);
    }
}
