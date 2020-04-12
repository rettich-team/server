import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';

@Injectable()
export class DatabaseConfigurationService extends BaseConfigurationService {
    constructor(protected readonly configService: ConfigService) {
        super(configService);
    }
}
