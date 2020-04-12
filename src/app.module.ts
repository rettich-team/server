import { Module } from '@nestjs/common';

import { ConfigurationsModule } from './configurations/configurations.module';
import { LoadersModule } from './loaders/loaders.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [ConfigurationsModule, LoadersModule, LocationsModule],
})
export class AppModule {}
