import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';

@Injectable()
export class DatabaseConfigurationService extends BaseConfigurationService {
    public type: string;
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public name: string;
    public logging: boolean;
    public synchronize: boolean;
    
    constructor(protected readonly configService: ConfigService) {
        super(configService);
        const prefix = 'DATABASE_';

        this.type = this.constructValue(
            `${prefix}TYPE`,
            Joi.string().valid('postgres', 'mssql').required(),
        );
        this.host = this.constructValue(
            `${prefix}HOST`,
            Joi.string().required(),
        );
        this.port = this.constructAndParseValue<number>(
            `${prefix}PORT`,
            Joi.number().port().required(),
            Number
        );
        this.username = this.constructValue(
            `${prefix}USERNAME`,
            Joi.string().allow('').optional(),
        );
        this.password = this.constructValue(
            `${prefix}PASSWORD`,
            Joi.string().allow('').optional(),
        );
        this.name = this.constructValue(
            `${prefix}NAME`,
            Joi.string().required(),
        );
        this.logging = this.constructAndParseValue<boolean>(
            `${prefix}LOGGING`,
            Joi.boolean().optional(),
            (value: string) => value === 'true'
        );
        this.synchronize = this.constructAndParseValue<boolean>(
            `${prefix}SYNCHRONIZE`,
            Joi.boolean().required(),
            (value: string) => value === 'true'
        );
    }
}