import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';

const mockLocationsRepository = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
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

  describe('getLocation', () => {
    it('returns a location by coordinates', async () => {
      const latitude = 0;
      const longitude = 0;
      
      const mockLocation: Location = {
        latitude,
        longitude,
        description: '',
        fillingLevel: LocationFillingLevel.EMPTY,
        createdAt: new Date(),
        updatedAt: new Date(),
        hasId: null,
        save: null,
        remove: null,
        reload: null,
      };

      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.getLocation(latitude, longitude);

      expect(location).toEqual(mockLocation);
    });

    it('throws a NotFoundException if the location was not found', () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(null);

      expect(locationsService.getLocation(0, 0)).rejects.toThrow(NotFoundException);
    });
  });
});
