import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfigurationService } from './database.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockSchemaValidationService = () => ({
  validate: jest.fn().mockImplementation(() => { return; }),
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
          provide: SchemaValidationService,
          useFactory: mockSchemaValidationService 
        }
      ],
    }).compile();

    databaseConfigurationService = module.get<DatabaseConfigurationService>(DatabaseConfigurationService);
  });

  it('should be defined', () => {
    expect(databaseConfigurationService).toBeDefined();
  });
});
