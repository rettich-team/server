import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { SwaggerConfigurationService } from './swagger.configuration.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

describe('SwaggerConfigurationService', () => {
  let swaggerConfigurationService: SwaggerConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwaggerConfigurationService,
        { 
          provide: ConfigService,
          useFactory: mockConfigService 
        }
      ],
    }).compile();

    swaggerConfigurationService = module.get<SwaggerConfigurationService>(SwaggerConfigurationService);
  });

  it('should be defined', () => {
    expect(swaggerConfigurationService).toBeDefined();
  });
});
