import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { BaseConfigurationService } from './base.configuration.service';

const mockConfigService = () => ({
});

describe('BaseConfigurationService', () => {
  let baseConfigurationService: BaseConfigurationService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            BaseConfigurationService,
            {
              provide: ConfigService, 
              useFactory: mockConfigService 
            }
        ],
    }).compile();

    baseConfigurationService = module.get<BaseConfigurationService>(BaseConfigurationService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(baseConfigurationService).toBeDefined();
  });
});
