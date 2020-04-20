import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';
import { ConfigurationValidationService } from './configuration.validation.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockConfigurationValidationService = () => ({
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
          provide: ConfigurationValidationService,
          useFactory: mockConfigurationValidationService 
        }
      ],
    }).compile();

    serverConfigurationService = module.get<ServerConfigurationService>(ServerConfigurationService);
  });

  it('should be defined', () => {
    expect(serverConfigurationService).toBeDefined();
  });
});
