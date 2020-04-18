import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TypeOrmLoader } from './typeORM.loader';
import { DatabaseConfigurationService } from '../configurations/database.configuration.service';

const mockDatabaseConfiguration: object = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'db',
  entities: [],
  logging: false,
  synchronize: false,
};

const mockDatabaseConfigurationService = () => (mockDatabaseConfiguration);

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

  it('should return a TypeORM configuration object', () => {
    const configurationOptions: TypeOrmModuleOptions = typeOrmLoader.createTypeOrmOptions();

    expect(configurationOptions).toMatchObject(mockDatabaseConfiguration);
  });
});
