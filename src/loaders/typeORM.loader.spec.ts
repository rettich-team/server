import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmLoader } from './typeORM.loader';
import { DatabaseConfigurationService } from '../configurations/database.configuration.service';

const mockDatabaseConfigurationService = () => ({
});

describe('TypeOrmLoader', () => {
  let typeOrmLoader: TypeOrmLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmLoader,
        {
          provide: DatabaseConfigurationService,
          useFactory: mockDatabaseConfigurationService 
        }
      ],
    }).compile();

    typeOrmLoader = module.get<TypeOrmLoader>(TypeOrmLoader);
  });

  it('should be defined', () => {
    expect(typeOrmLoader).toBeDefined();
  });
});
