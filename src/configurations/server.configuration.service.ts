import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';

@Injectable()
export class ServerConfigurationService extends BaseConfigurationService {
    public readonly port: number;
    
    constructor(protected readonly configService: ConfigService) {
        super(configService);
        this.port = this.constructAndParseValue<number>(
            'SERVER_PORT', 
            Joi.number().port().required(), 
            Number
        );
    }
}
