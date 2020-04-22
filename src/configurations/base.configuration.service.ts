import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

export abstract class BaseConfigurationService {
    constructor(
        protected readonly configService: ConfigService,
        protected readonly schemaValidationService: SchemaValidationService,
        fieldItems: object[],
    ) {
        fieldItems = this.mapEnvironmentValues(fieldItems);

        const validationSchemaMap: Joi.SchemaMap = this.getValidationSchemaFromFieldItems(fieldItems);
        const validationSchema: Joi.ObjectSchema = Joi.object(validationSchemaMap);
        const valuesMap: object = this.getValuesMapFromFieldItems(fieldItems);

        this.schemaValidationService.validate(valuesMap, validationSchema);

        this.setFieldValues(fieldItems);
    }

    private mapEnvironmentValues(fieldItems: object[]): object[] {
        return fieldItems.map((fieldItem: object) => {
            fieldItem['environmentValue'] = this.configService.get(fieldItem['environmentKey']);
            
            return fieldItem;
        });
    }

    private getValidationSchemaFromFieldItems(fieldItems: object[]): Joi.SchemaMap {
        const validationSchema: Joi.SchemaMap = {};
        
        fieldItems.forEach((fieldItem: object) => {
            validationSchema[fieldItem['environmentKey']] = fieldItem['validator'];
        });

        return validationSchema;
    }

    private getValuesMapFromFieldItems(fieldItems: object[]): object {
        const valuesMap: object = {};
        
        fieldItems.forEach((fieldItem: object) => {
            valuesMap[fieldItem['environmentKey']] = fieldItem['environmentValue']
        });

        return valuesMap;
    }

    private setFieldValues(fieldItems: object[]): void {
        fieldItems.forEach((fieldItem: object) => {
            const parser: Function = fieldItem['parser'];
            const environmentValue: string = fieldItem['environmentValue'];

            let fieldValue: any = undefined;

            if (parser) {
                fieldValue = parser(environmentValue);
            } else {
                fieldValue = environmentValue;
            }

            this[fieldItem['field']] = fieldValue;
        });
    }
}