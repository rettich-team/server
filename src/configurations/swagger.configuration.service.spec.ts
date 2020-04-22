import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { SwaggerConfigurationService } from './swagger.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockValueSchemaValidationService = () => ({
  validateValue: jest.fn().mockImplementation(() => { return; }),
});

describe('SwaggerConfigurationService', () => {
  let swaggerConfigurationService: SwaggerConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwaggerConfigurationService,
        { 
          provide: ConfigService,
          useFactory: mockConfigService 
        },
        {
          provide: ValueSchemaValidationService,
          useFactory: mockValueSchemaValidationService 
        }
      ],
    }).compile();

    swaggerConfigurationService = module.get<SwaggerConfigurationService>(SwaggerConfigurationService);
  });

  it('should be defined', () => {
    expect(swaggerConfigurationService).toBeDefined();
  });
});
