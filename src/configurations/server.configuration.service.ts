import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class ServerConfigurationService {
    public readonly port: number;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        const serverPort = 'SERVER_PORT';
        this.port = this.configService.get(serverPort);
        this.valueSchemaValidationService.validateValue(this.port, Joi.number().port().required(), serverPort);
        this.port = Number(this.port);
    }
}
