import { Test, TestingModule } from '@nestjs/testing';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

describe('LocationsController', () => {
  let locationsController: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService]
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
  });
});
