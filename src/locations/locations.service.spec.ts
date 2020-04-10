import { Test, TestingModule } from '@nestjs/testing';

import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let locationsService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });
});
