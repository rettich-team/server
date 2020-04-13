import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';

import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { GetLocationByCoordinatesDTO } from './dtos/getLocationByCoordinates.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  public getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  @Get(':latitude/:longitude')
  public getLocationByCoordinates(
    @Param() { latitude, longitude }: GetLocationByCoordinatesDTO,
  ): Promise<Location> {
    return this.locationsService.getLocationByCoordinates(latitude, longitude);
  }

  @Post()
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    return this.locationsService.addLocation(addLocationDTO);
  }
}
