import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServerConfigurationService } from './server.configuration.service';
import { EnvironmentConfigurationService } from './environment.configuration.service';
import { DatabaseConfigurationService } from './database.configuration.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
  ],
  exports: [
    ServerConfigurationService,
    EnvironmentConfigurationService,
    DatabaseConfigurationService,
  ],
})
export class ConfigurationsModule {}
