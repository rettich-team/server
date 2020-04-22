import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class ServerConfigurationService extends BaseConfigurationService {
    public readonly port: number;
    
    constructor(
        protected readonly configService: ConfigService,
        protected readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        super(configService, valueSchemaValidationService);
        this.port = this.constructAndParseValue<number>(
            'SERVER_PORT', 
            Joi.number().port().required(), 
            Number
        );
    }
}
