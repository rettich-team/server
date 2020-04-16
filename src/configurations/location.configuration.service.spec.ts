import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { LocationConfigurationService } from './location.configuration.service';

const mockConfigService = () => ({
  get: jest.fn(),
});

describe('LocationConfigurationService', () => {
  let locationConfigurationService: LocationConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationConfigurationService,
        { 
          provide: ConfigService,
          useFactory: mockConfigService 
        }
      ],
    }).compile();

    locationConfigurationService = module.get<LocationConfigurationService>(LocationConfigurationService);
  });

  it('should be defined', () => {
    expect(locationConfigurationService).toBeDefined();
  });
});
