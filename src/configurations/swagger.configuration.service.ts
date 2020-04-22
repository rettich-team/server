import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

@Injectable()
export class SwaggerConfigurationService extends BaseConfigurationService {
    public readonly title: string;
    public readonly description: string;
    public readonly version: string;
    public readonly path: string;
    
    constructor(
        protected readonly configService: ConfigService, 
        protected readonly schemaValidationService: SchemaValidationService,
    ) {
        super(configService, schemaValidationService, [{
            field: 'title',
            environmentKey: 'SWAGGER_TITLE',
            validator: Joi.string().required(),
        }, {
            field: 'description',
            environmentKey: 'SWAGGER_DESCRIPTION',
            validator: Joi.string().required(),
        }, {
            field: 'version',
            environmentKey: 'SWAGGER_VERSION',
            validator: Joi.string().required(),
        }, {
            field: 'path',
            environmentKey: 'SWAGGER_PATH',
            validator: Joi.string().required(),
        }]);
    }
}