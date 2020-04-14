import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfigurationService } from './database.configuration.service';

const mockConfigService = () => ({
  get: jest.fn(),
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
        }
      ],
    }).compile();

    databaseConfigurationService = module.get<DatabaseConfigurationService>(DatabaseConfigurationService);
  });

  it('should be defined', () => {
    expect(databaseConfigurationService).toBeDefined();
  });
});
