import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DatabaseConfigurationService } from '../configurations/database.configuration.service';

@Injectable()
export class TypeOrmLoader implements TypeOrmOptionsFactory {
  constructor(private readonly databaseConfigurationService: DatabaseConfigurationService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.databaseConfigurationService.type as any,
      host: this.databaseConfigurationService.host,
      port: this.databaseConfigurationService.port,
      username: this.databaseConfigurationService.username,
      password: this.databaseConfigurationService.password,
      database: this.databaseConfigurationService.database,
      entities: this.databaseConfigurationService.entities,
      logging: this.databaseConfigurationService.logging,
      synchronize: this.databaseConfigurationService.synchronize,
    };
  }
}
