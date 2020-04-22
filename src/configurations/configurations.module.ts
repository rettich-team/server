import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SchemaValidationService } from '../shared/validators/schemaValidation.service';
import { ServerConfigurationService } from './server.configuration.service';
import { EnvironmentConfigurationService } from './environment.configuration.service';
import { DatabaseConfigurationService } from './database.configuration.service';
import { SwaggerConfigurationService } from './swagger.configuration.service';
import { LocationConfigurationService } from './location.configuration.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    SchemaValidationService,
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
    SwaggerConfigurationService,
    LocationConfigurationService,
  ],
  exports: [
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
    SwaggerConfigurationService,
    LocationConfigurationService,
  ],
})
export class ConfigurationsModule {}
