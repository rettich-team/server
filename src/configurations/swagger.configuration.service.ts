import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

@Injectable()
export class SwaggerConfigurationService {
    public readonly title: string;
    public readonly description: string;
    public readonly version: string;
    public readonly path: string;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly valueSchemaValidationService: ValueSchemaValidationService
    ) {
        this.setField('title', 'TITLE');
        this.setField('description', 'DESCRIPTION');
        this.setField('version', 'VERSION');
        this.setField('path', 'PATH');
    }

    private setField(field: string, fieldName: string): void {
        const fieldKey = `SWAGGER_${fieldName}`;
        const fieldValue: string = this.configService.get(fieldKey);
        
        this.valueSchemaValidationService.validateValue(fieldValue, Joi.string().required(), fieldKey);
        this[field] = fieldValue;
    }
}
