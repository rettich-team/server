import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class DatabaseConfigurationService {
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
        private readonly configService: ConfigService,
        private readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        this.entities = [`${__dirname}/../**/*.entity.{ts,js}`];

        this.setField('type', 'TYPE', Joi.string().valid('postgres', 'mssql').required());
        this.setField('host', 'HOST', Joi.string().required());
        this.setField('port', 'PORT', Joi.number().port().required(), Number);
        this.setField('username', 'USERNAME', Joi.string().allow('').optional());
        this.setField('password', 'PASSWORD', Joi.string().allow('').optional());
        this.setField('database', 'NAME', Joi.string().required());
        this.setField('logging', 'LOGGING', Joi.string().valid('true', 'false').optional(), (value: string) => value === 'true');
        this.setField('synchronize', 'SYNCHRONIZE', Joi.string().valid('true', 'false').optional(), (value: string) => value === 'true');
    }

    private setField(field: string, fieldName: string, validator: Joi.AnySchema, parser?: (value: string) => any): void {
        const fieldKey = `DATABASE_${fieldName}`;
        const fieldValue: string = this.configService.get(fieldKey);

        this.valueSchemaValidationService.validateValue(fieldValue, validator, fieldKey);
        this[field] = parser ? parser(fieldValue) : fieldValue;
    }
}