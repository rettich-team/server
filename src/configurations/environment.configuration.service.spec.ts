import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfigurationService } from './environment.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockSchemaValidationService = () => ({
  validate: jest.fn().mockImplementation(() => { return; }),
});

describe('EnvironmentConfigurationService', () => {
  let environmentConfigurationService: EnvironmentConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentConfigurationService,
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

    environmentConfigurationService = module.get<EnvironmentConfigurationService>(EnvironmentConfigurationService);
  });

  it('should be defined', () => {
    expect(environmentConfigurationService).toBeDefined();
  });
});
