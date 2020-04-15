import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';

@Injectable()
export class SwaggerConfigurationService extends BaseConfigurationService {
    public readonly title: string;
    public readonly description: string;
    public readonly version: string;
    public readonly path: string;
    
    constructor(protected readonly configService: ConfigService) {
        super(configService);
        this.title = this.constructValue(
            'SWAGGER_TITLE',
            Joi.string().required()
        );
        this.description = this.constructValue(
            'SWAGGER_DESCRIPTION',
            Joi.string().required()
        );
        this.title = this.constructValue(
            'SWAGGER_VERSION',
            Joi.string().required()
        );
        this.path = this.constructValue(
            'SWAGGER_PATH',
            Joi.string().required()
        );
    }
}
