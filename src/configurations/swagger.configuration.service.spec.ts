import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { SwaggerConfigurationService } from './swagger.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockSchemaValidationService = () => ({
  validate: jest.fn().mockImplementation(() => { return; }),
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
          provide: SchemaValidationService,
          useFactory: mockSchemaValidationService 
        }
      ],
    }).compile();

    swaggerConfigurationService = module.get<SwaggerConfigurationService>(SwaggerConfigurationService);
  });

  it('should be defined', () => {
    expect(swaggerConfigurationService).toBeDefined();
  });
});
