import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfigurationService } from './environment.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockValueSchemaValidationService = () => ({
  validateValue: jest.fn().mockImplementation(() => { return; }),
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
          provide: ValueSchemaValidationService,
          useFactory: mockValueSchemaValidationService 
        }
      ],
    }).compile();

    environmentConfigurationService = module.get<EnvironmentConfigurationService>(EnvironmentConfigurationService);
  });

  it('should be defined', () => {
    expect(environmentConfigurationService).toBeDefined();
  });
});
