import { Module } from '@nestjs/common';

import { ConfigurationsModule } from './configurations/configurations.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [ConfigurationsModule, LocationsModule],
})
export class AppModule {}
