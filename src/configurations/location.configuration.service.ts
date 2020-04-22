import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class LocationConfigurationService {
    public readonly descriptionMaxLength: number;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        const locationDescriptionMaxLength = 'LOCATION_DESCRIPTION_MAX_LENGTH';
        this.descriptionMaxLength = this.configService.get(locationDescriptionMaxLength);
        this.valueSchemaValidationService.validateValue(this.descriptionMaxLength, Joi.number().integer().required(), locationDescriptionMaxLength);
        this.descriptionMaxLength = Number(this.descriptionMaxLength);
    }
}
