import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { SwaggerConfigurationService } from './swagger.configuration.service';
import { ConfigurationValidationService } from './configuration.validation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockConfigurationValidationService = () => ({
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
          provide: ConfigurationValidationService,
          useFactory: mockConfigurationValidationService 
        }
      ],
    }).compile();

    swaggerConfigurationService = module.get<SwaggerConfigurationService>(SwaggerConfigurationService);
  });

  it('should be defined', () => {
    expect(swaggerConfigurationService).toBeDefined();
  });
});
