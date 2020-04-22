import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from '@hapi/joi';

import { ValueSchemaValidationService } from './valueSchemaValidation.service';

describe('ValueSchemaValidationService', () => {
  let valueSchemaValidationService: ValueSchemaValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValueSchemaValidationService,
      ],
    }).compile();

    valueSchemaValidationService = module.get<ValueSchemaValidationService>(ValueSchemaValidationService);
  });

  it('should be defined', () => {
    expect(valueSchemaValidationService).toBeDefined();
  });

  describe('validateValue', () => {
    it('throws no error on valid configuration', () => {
      expect(() => valueSchemaValidationService.validateValue('text', Joi.string(), 'text')).not.toThrow();
    });
  
    it('throws a ValidationError on invalid configuration', () => {
      expect(() => valueSchemaValidationService.validateValue('text', Joi.number(), 'text')).toThrow(Joi.ValidationError);
    });
  
    it('starts the ValidationError message with the "valueName" if provided', () => {
      const valueName = 'fieldName';
      
      try {
        valueSchemaValidationService.validateValue('text', Joi.number(), valueName)
      } catch (error) {
        expect(error.message.startsWith(`"${valueName}"`)).toBeTruthy();
      }
    });
  
    it('starts the ValidationError message with "value" if no value name was provided', () => {
      try {
        valueSchemaValidationService.validateValue('text', Joi.number())
      } catch (error) {
        expect(error.message.startsWith('"value"')).toBeTruthy();
      }
    });
  });
});
