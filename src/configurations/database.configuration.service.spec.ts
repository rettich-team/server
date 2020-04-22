import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfigurationService } from './database.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockValueSchemaValidationService = () => ({
  validateValue: jest.fn().mockImplementation(() => { return; }),
});

describe('DatabaseConfigurationService', () => {
  let databaseConfigurationService: DatabaseConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfigurationService,
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

    databaseConfigurationService = module.get<DatabaseConfigurationService>(DatabaseConfigurationService);
  });

  it('should be defined', () => {
    expect(databaseConfigurationService).toBeDefined();
  });
});
