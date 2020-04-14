import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query
} from '@nestjs/common';

import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { LocationCoordinatesParamsDTO } from './dtos/locationCoordinates.params.dto';
import { UpdateLocationDescriptionBodyDTO } from './dtos/updateLocationDescription/updateLocationDescription.body.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelBodyDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.body.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';
import { GetLocationsDTO } from './dtos/getLocations.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  public getLocations(
    @Query() getLocationsDTO: GetLocationsDTO,
  ): Promise<Location[]> {
    return this.locationsService.getLocations(getLocationsDTO);
  }

  @Get(':latitude/:longitude')
  public getLocation(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
  ): Promise<Location> {
    return this.locationsService.getLocation(latitude, longitude);
  }

  @Post()
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    return this.locationsService.addLocation(addLocationDTO);
  }

  @Patch(':latitude/:longitude/description')
  public updateLocationDescription(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { description }: UpdateLocationDescriptionBodyDTO,
  ): Promise<Location> {
    const updateLocationDescriptionDTO: UpdateLocationDescriptionDTO = new UpdateLocationDescriptionDTO(latitude, longitude, description);
    return this.locationsService.updateLocationDescription(updateLocationDescriptionDTO);
  }

  @Patch(':latitude/:longitude/fillingLevel')
  public updateLocationFillingLevel(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { fillingLevel }: UpdateLocationFillingLevelBodyDTO,
  ): Promise<Location> {
    const updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO = new UpdateLocationFillingLevelDTO(latitude, longitude, fillingLevel);
    return this.locationsService.updateLocationFillingLevel(updateLocationFillingLevelDTO);
  }
}
