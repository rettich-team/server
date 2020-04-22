import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class EnvironmentConfigurationService {
    public readonly environment: string;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        const nodeEnvironment = 'NODE_ENV';
        this.environment = this.configService.get(nodeEnvironment);
        this.valueSchemaValidationService.validateValue(this.environment, Joi.string().valid('development', 'production', 'test').required(), nodeEnvironment);
    }
}
