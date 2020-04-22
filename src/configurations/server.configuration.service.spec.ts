import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';
import { SchemaValidationService } from '../shared/validators/schemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockSchemaValidationService = () => ({
  validate: jest.fn().mockImplementation(() => { return; }),
});

describe('ServerConfigurationService', () => {
  let serverConfigurationService: ServerConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServerConfigurationService,
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

    serverConfigurationService = module.get<ServerConfigurationService>(ServerConfigurationService);
  });

  it('should be defined', () => {
    expect(serverConfigurationService).toBeDefined();
  });
});
