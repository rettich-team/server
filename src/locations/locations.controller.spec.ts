import { Test, TestingModule } from '@nestjs/testing';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';
import { AddLocationDTO } from './dtos/addLocation.dto';

const mockLocationsService = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
  addLocation: jest.fn(),
});

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

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
    expect(locationsController).toBeDefined();
  });

  describe('getLocation', () => {
    it('returns a location by coordinates', async () => {
      jest
        .spyOn(locationsService, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsController.getLocation({ 
        latitude: mockLocation.latitude, 
        longitude: mockLocation.longitude 
      });

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
        description: mockLocation.description
      };
      
      const location: Location = await locationsController.addLocation(addLocationDTO);

      expect(locationsService.addLocation).toHaveBeenCalledWith(addLocationDTO);
      expect(location).toEqual(mockLocation);
    });
  });
});
