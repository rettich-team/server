import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';
import { EnvironmentConfigurationService } from './environment.configuration.service';
import { DatabaseConfigurationService } from './database.configuration.service';
import { SwaggerConfigurationService } from './swagger.configuration.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
    SwaggerConfigurationService,
  ],
  exports: [
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
    SwaggerConfigurationService,
  ],
})
export class ConfigurationsModule {}
