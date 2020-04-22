import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from '@hapi/joi';

import { SchemaValidationService } from './schemaValidation.service';

describe('SchemaValidationService', () => {
  let schemaValidationService: SchemaValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchemaValidationService,
      ],
    }).compile();

    schemaValidationService = module.get<SchemaValidationService>(SchemaValidationService);
  });

  it('should be defined', () => {
    expect(schemaValidationService).toBeDefined();
  });

  describe('validate', () => {
    it('throws no error if the validation succeeds', () => {
      const valueMap: object = {
        value: 'foo',
      };
      const validationSchema: Joi.AnySchema = Joi.object({
        value: Joi.string(),
      });
      
      expect(() => schemaValidationService.validate(valueMap, validationSchema)).not.toThrow();
    });
  
    it('throws a ValidationError if the validation fails', () => {
      const valueMap: object = {
        value: 'foo',
      };
      const validationSchema: Joi.AnySchema = Joi.object({
        value: Joi.number(),
      });
      
      expect(() => schemaValidationService.validate(valueMap, validationSchema)).toThrow(Joi.ValidationError);
    });
  });
});
