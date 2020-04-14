import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';

const mockConfigService = () => ({
  get: jest.fn(),
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
        }
      ],
    }).compile();

    serverConfigurationService = module.get<ServerConfigurationService>(ServerConfigurationService);
  });

  it('should be defined', () => {
    expect(serverConfigurationService).toBeDefined();
  });
});
