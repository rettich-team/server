import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';

import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';
import { AddLocationDTO } from './dtos/addLocation.dto';

const mockLocationsRepository = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
  addLocation: jest.fn(),
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

  const mockLocation: Location = {
    latitude: 0,
    longitude: 0,
    description: '',
    fillingLevel: LocationFillingLevel.EMPTY,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasId: null,
    save: null,
    remove: null,
    reload: null,
  };

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });

  describe('getLocation', () => {
    it('returns a location by coordinates', async () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.getLocation(mockLocation.latitude, mockLocation.longitude);

      expect(location).toEqual(mockLocation);
    });

    it('throws a NotFoundException if the location was not found', () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(null);

      expect(locationsService.getLocation(0, 0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addLocation', () => {
    const addLocationDTO: AddLocationDTO = { 
      latitude: 0, 
      longitude: 0, 
      description: ''
    };

    it('adds a location', async () => {
      jest
        .spyOn(locationsRepository, 'addLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.addLocation(addLocationDTO);

      expect(locationsRepository.addLocation).toHaveBeenCalledWith(addLocationDTO);
      expect(location).toEqual(mockLocation);
    });

    it('throws a ConflictException if the location already exists', () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      expect(locationsService.addLocation(addLocationDTO)).rejects.toThrow(ConflictException);
    });
  });
});
