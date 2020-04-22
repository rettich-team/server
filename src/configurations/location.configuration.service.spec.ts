import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { LocationConfigurationService } from './location.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockSchemaValidationService = () => ({
  validate: jest.fn().mockImplementation(() => { return; }),
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
          provide: SchemaValidationService,
          useFactory: mockSchemaValidationService 
        }
      ],
    }).compile();

    locationConfigurationService = module.get<LocationConfigurationService>(LocationConfigurationService);
  });

  it('should be defined', () => {
    expect(locationConfigurationService).toBeDefined();
  });
});
