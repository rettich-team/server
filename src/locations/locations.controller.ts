import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
} from '@nestjs/common';

import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { GetLocationByCoordinatesDTO } from './dtos/getLocationByCoordinates.dto';
import { UpdateLocationDescriptionByCoordinatesParamsDTO } from './dtos/updateLocationDescription/updateLocationDescriptionByCoordinates.params.dto';
import { UpdateLocationDescriptionByCoordinatesBodyDTO } from './dtos/updateLocationDescription/updateLocationDescriptionByCoordinates.body.dto';
import { UpdateLocationDescriptionByCoordinatesDTO } from './dtos/updateLocationDescription/updateLocationDescriptionByCoordinates.dto';

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

  @Patch(':latitude/:longitude/description')
  public updateLocationDescription(
    @Param() { latitude, longitude }: UpdateLocationDescriptionByCoordinatesParamsDTO,
    @Body() { description }: UpdateLocationDescriptionByCoordinatesBodyDTO,
  ): Promise<Location> {
    const updateLocationDescriptionByCoordinatesDTO: UpdateLocationDescriptionByCoordinatesDTO = new UpdateLocationDescriptionByCoordinatesDTO(latitude, longitude, description);
    return this.locationsService.updateLocationDescription(updateLocationDescriptionByCoordinatesDTO);
  }
}
