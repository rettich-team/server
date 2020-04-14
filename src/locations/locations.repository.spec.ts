import { Test, TestingModule } from '@nestjs/testing';

import { LocationsRepository } from './locations.repository';

describe('LocationsService', () => {
  let locationsRepository: LocationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsRepository]
    }).compile();

    locationsRepository = module.get<LocationsRepository>(LocationsRepository);
  });

  it('should be defined', () => {
    expect(locationsRepository).toBeDefined();
  });
});
