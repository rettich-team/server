import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationsRepository]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
