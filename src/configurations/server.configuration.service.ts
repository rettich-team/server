import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

@Injectable()
export class ServerConfigurationService extends BaseConfigurationService {
    public readonly port: number;

    constructor(
        protected readonly configService: ConfigService, 
        protected readonly schemaValidationService: SchemaValidationService,
    ) {
        super(configService, schemaValidationService, [{
            field: 'port',
            environmentKey: 'SERVER_PORT',
            validator: Joi.number().port().required(),
            parser: Number,
        }]);
    }
}
