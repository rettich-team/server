import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';
import { ValueSchemaValidationService } from '../shared/validators/valueSchemaValidation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockValueSchemaValidationService = () => ({
  validateValue: jest.fn().mockImplementation(() => { return; }),
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
          provide: ValueSchemaValidationService,
          useFactory: mockValueSchemaValidationService 
        }
      ],
    }).compile();

    serverConfigurationService = module.get<ServerConfigurationService>(ServerConfigurationService);
  });

  it('should be defined', () => {
    expect(serverConfigurationService).toBeDefined();
  });
});
