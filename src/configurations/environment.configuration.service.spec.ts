import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfigurationService } from './environment.configuration.service';

const mockConfigService = () => ({
  get: jest.fn(),
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
        }
      ],
    }).compile();

    environmentConfigurationService = module.get<EnvironmentConfigurationService>(EnvironmentConfigurationService);
  });

  it('should be defined', () => {
    expect(environmentConfigurationService).toBeDefined();
  });
});
