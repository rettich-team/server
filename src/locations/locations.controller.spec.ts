import { Test, TestingModule } from '@nestjs/testing';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { LocationCoordinatesParamsDTO } from './dtos/locationCoordinates.params.dto';
import { UpdateLocationDescriptionBodyDTO } from './dtos/updateLocationDescription/updateLocationDescription.body.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelBodyDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.body.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';
import { GetLocationsDTO } from './dtos/getLocations.dto';

const mockLocationsService = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
  addLocation: jest.fn(),
  updateLocationDescription: jest.fn(),
  updateLocationFillingLevel: jest.fn(),
});

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  let mockLocation: Location;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService, 
          useFactory: mockLocationsService 
        }
      ]
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);

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
    expect(locationsController).toBeDefined();
  });

  describe('getLocations', () => {
    it('returns locations', async () => {
      const mockLocations: Location[] = [];
      
      jest
        .spyOn(locationsService, 'getLocations')
        .mockResolvedValue(mockLocations);

      const getLocationsDTO: GetLocationsDTO = {};
      const locations: Location[] = await locationsController.getLocations(getLocationsDTO);

      expect(locationsService.getLocations).toHaveBeenCalledWith(getLocationsDTO);
      expect(locations).toEqual(mockLocations);
    });
  });

  describe('getLocation', () => {
    it('returns a location by coordinates', async () => {
      jest
        .spyOn(locationsService, 'getLocation')
        .mockResolvedValue(mockLocation);

      const locationCoordinatesParamsDTO: LocationCoordinatesParamsDTO = { 
        latitude: mockLocation.latitude, 
        longitude: mockLocation.longitude 
      };

      const location: Location = await locationsController.getLocation(locationCoordinatesParamsDTO);

      expect(locationsService.getLocation).toHaveBeenCalledWith(mockLocation.latitude, mockLocation.longitude);
      expect(location).toEqual(mockLocation);
    });
  });

  describe('addLocation', () => {
    it('adds a location', async () => {
      jest
        .spyOn(locationsService, 'addLocation')
        .mockResolvedValue(mockLocation);
      
      const addLocationDTO: AddLocationDTO = { 
        latitude: mockLocation.latitude,
        longitude: mockLocation.longitude, 
        description: mockLocation.description,
        fillingLevel: mockLocation.fillingLevel,
      };
      
      const location: Location = await locationsController.addLocation(addLocationDTO);

      expect(locationsService.addLocation).toHaveBeenCalledWith(addLocationDTO);
      expect(location).toEqual(mockLocation);
    });
  });

  describe('updateLocationDescription', () => {
    it('updates the description of a location', async () => {
      mockLocation.description = 'new description';
      
      jest
        .spyOn(locationsService, 'updateLocationDescription')
        .mockResolvedValue(mockLocation);
      
      const locationCoordinatesParamsDTO: LocationCoordinatesParamsDTO = { latitude: mockLocation.latitude, longitude: mockLocation.longitude };
      const updateLocationDescriptionBodyDTO: UpdateLocationDescriptionBodyDTO = { description: mockLocation.description };
      const updateLocationDescriptionDTO: UpdateLocationDescriptionDTO = { 
        latitude: locationCoordinatesParamsDTO.latitude,
        longitude: locationCoordinatesParamsDTO.longitude,
        description: updateLocationDescriptionBodyDTO.description 
      };

      const location: Location = await locationsController.updateLocationDescription(locationCoordinatesParamsDTO, updateLocationDescriptionBodyDTO);

      expect(locationsService.updateLocationDescription).toHaveBeenCalledWith(updateLocationDescriptionDTO);
      expect(location).toEqual(mockLocation);
    });
  });

  describe('updateLocationFillingLevel', () => {
    it('updates the filling level of a location', async () => {
      mockLocation.fillingLevel = LocationFillingLevel.FULL;
      
      jest
        .spyOn(locationsService, 'updateLocationFillingLevel')
        .mockResolvedValue(mockLocation);
      
      const locationCoordinatesParamsDTO: LocationCoordinatesParamsDTO = { latitude: mockLocation.latitude, longitude: mockLocation.longitude };
      const updateLocationFillingLevelBodyDTO: UpdateLocationFillingLevelBodyDTO = { fillingLevel: mockLocation.fillingLevel };
      const updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO = {
        latitude: locationCoordinatesParamsDTO.latitude,
        longitude: locationCoordinatesParamsDTO.longitude,
        fillingLevel: updateLocationFillingLevelBodyDTO.fillingLevel 
      };

      const location: Location = await locationsController.updateLocationFillingLevel(locationCoordinatesParamsDTO, updateLocationFillingLevelBodyDTO);

      expect(locationsService.updateLocationFillingLevel).toHaveBeenCalledWith(updateLocationFillingLevelDTO);
      expect(location).toEqual(mockLocation);
    });
  });
});
