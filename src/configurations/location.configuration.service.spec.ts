import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { LocationConfigurationService } from './location.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockValueSchemaValidationService = () => ({
  validateValue: jest.fn().mockImplementation(() => { return; }),
});

describe('LocationConfigurationService', () => {
  let locationConfigurationService: LocationConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationConfigurationService,
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

    locationConfigurationService = module.get<LocationConfigurationService>(LocationConfigurationService);
  });

  it('should be defined', () => {
    expect(locationConfigurationService).toBeDefined();
  });
});
