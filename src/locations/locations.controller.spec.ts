import { Test, TestingModule } from '@nestjs/testing';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { LocationFillingLevel } from './locationFillingLevel.enum';

const mockLocationsService = () => ({
  getLocations: jest.fn(),
  getLocation: jest.fn(),
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

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
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
        .spyOn(locationsService, 'getLocation')
        .mockResolvedValue(mockLocation);

      const location: Location = await locationsController.getLocation({ latitude, longitude });

      expect(location).toEqual(mockLocation);
    });
  });
});
