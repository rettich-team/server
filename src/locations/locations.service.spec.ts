import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';

const mockLocationsRepository = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
  addLocation: jest.fn(),
  updateLocationDescription: jest.fn(),
  updateLocationFillingLevel: jest.fn(),
});

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let locationsRepository: LocationsRepository;

  let mockLocation: Location;

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

    mockLocation = {
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
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });

  describe('getLocation', () => {
    it('returns a location by coordinates', async () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.getLocation(mockLocation.latitude, mockLocation.longitude);

      expect(locationsRepository.getLocation).toHaveBeenCalledWith(mockLocation.latitude, mockLocation.longitude);
      expect(location).toEqual(mockLocation);
    });

    it('throws a NotFoundException if the location was not found', () => {
      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(null);

      expect(locationsService.getLocation(mockLocation.latitude, mockLocation.longitude)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addLocation', () => {
    let addLocationDTO: AddLocationDTO;

    beforeEach(() => {
      addLocationDTO = { 
        latitude: mockLocation.latitude, 
        longitude: mockLocation.longitude, 
        description: mockLocation.description
      };
    });

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

  describe('updateLocationDescription', () => {
    let updateLocationDescriptionDTO: UpdateLocationDescriptionDTO;

    beforeEach(() => {
      mockLocation.description = 'new description';

      updateLocationDescriptionDTO = { 
        latitude: mockLocation.latitude,
        longitude: mockLocation.longitude,
        description: mockLocation.description 
      };
    });

    it('updates the description of a location', async () => {
      const updateResult: UpdateResult = { raw: null, generatedMaps: null, affected: 1 };
      
      jest
        .spyOn(locationsRepository, 'updateLocationDescription')
        .mockResolvedValue(updateResult);

      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.updateLocationDescription(updateLocationDescriptionDTO);

      expect(locationsRepository.updateLocationDescription).toHaveBeenCalledWith(updateLocationDescriptionDTO);
      expect(location).toEqual(mockLocation);
    });

    it('throws a NotFoundException if the location was not found', () => {
      const updateResult: UpdateResult = { raw: null, generatedMaps: null, affected: 0 };
      
      jest
        .spyOn(locationsRepository, 'updateLocationDescription')
        .mockResolvedValue(updateResult);

      expect(locationsService.updateLocationDescription(updateLocationDescriptionDTO)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateLocationFillingLevel', () => {
    let updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO;

    beforeEach(() => {
      mockLocation.fillingLevel = LocationFillingLevel.FULL;

      updateLocationFillingLevelDTO = { 
        latitude: mockLocation.latitude,
        longitude: mockLocation.longitude,
        fillingLevel: mockLocation.fillingLevel 
      };
    });

    it('updates the filling level of a location', async () => {
      const updateResult: UpdateResult = { raw: null, generatedMaps: null, affected: 1 };
      
      jest
        .spyOn(locationsRepository, 'updateLocationFillingLevel')
        .mockResolvedValue(updateResult);

      jest
        .spyOn(locationsRepository, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsService.updateLocationFillingLevel(updateLocationFillingLevelDTO);

      expect(locationsRepository.updateLocationFillingLevel).toHaveBeenCalledWith(updateLocationFillingLevelDTO);
      expect(location).toEqual(mockLocation);
    });

    it('throws a NotFoundException if the location was not found', () => {
      const updateResult: UpdateResult = { raw: null, generatedMaps: null, affected: 0 };
      
      jest
        .spyOn(locationsRepository, 'updateLocationFillingLevel')
        .mockResolvedValue(updateResult);

      expect(locationsService.updateLocationFillingLevel(updateLocationFillingLevelDTO)).rejects.toThrow(NotFoundException);
    });
  });
});
