import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from '@hapi/joi';

import { ConfigurationValidationService } from './configuration.validation.service';

describe('ConfigurationValidationService', () => {
  let configurationValidationService: ConfigurationValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationValidationService,
      ],
    }).compile();

    configurationValidationService = module.get<ConfigurationValidationService>(ConfigurationValidationService);
  });

  it('should be defined', () => {
    expect(configurationValidationService).toBeDefined();
  });

  it('throws no error on valid configuration', () => {
    expect(() => configurationValidationService.validateValue('text', Joi.string(), 'text')).not.toThrow();
  });

  it('throws a ValidationError on invalid configuration', () => {
    expect(() => configurationValidationService.validateValue('text', Joi.number(), 'text')).toThrow(Joi.ValidationError);
  });
});
