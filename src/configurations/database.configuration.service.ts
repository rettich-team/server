import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { BaseConfigurationService } from './base.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

@Injectable()
export class DatabaseConfigurationService extends BaseConfigurationService {
    public type: string;
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public database: string;
    public entities: string[];
    public logging: boolean;
    public synchronize: boolean;

    constructor(
        protected readonly configService: ConfigService, 
        protected readonly schemaValidationService: SchemaValidationService,
    ) {
        super(configService, schemaValidationService, [{
            field: 'type',
            environmentKey: 'DATABASE_TYPE',
            validator: Joi.string().valid('postgres', 'mssql').required(),
        }, {
            field: 'host',
            environmentKey: 'DATABASE_HOST',
            validator: Joi.string().required(),
        }, {
            field: 'port',
            environmentKey: 'DATABASE_PORT',
            validator: Joi.number().port().required(),
            parser: Number,
        }, {
            field: 'username',
            environmentKey: 'DATABASE_USERNAME',
            validator: Joi.string().allow('').optional(),
        }, {
            field: 'password',
            environmentKey: 'DATABASE_PASSWORD',
            validator: Joi.string().allow('').optional(),
        }, {
            field: 'database',
            environmentKey: 'DATABASE_NAME',
            validator: Joi.string().required(),
        }, {
            field: 'logging',
            environmentKey: 'DATABASE_LOGGING',
            validator: Joi.string().valid('true', 'false').optional(),
            parser: (value: string) => value === 'true',
        }, {
            field: 'synchronize',
            environmentKey: 'DATABASE_SYNCHRONIZE',
            validator: Joi.string().valid('true', 'false').optional(),
            parser: (value: string) => value === 'true',
        }]);

        this.entities = [`${__dirname}/../**/*.entity.{ts,js}`];
    }
}