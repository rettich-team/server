import { Test, TestingModule } from '@nestjs/testing';

import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';

const mockLocationsRepository = () => ({
  getLocations: jest.fn(),
});

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let locationsRepository: LocationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        { 
          provide: LocationsRepository, 
          useFactory: mockLocationsRepository 
        }
      ],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
    locationsRepository = module.get<LocationsRepository>(LocationsRepository);
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });
});
