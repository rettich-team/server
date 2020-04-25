import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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
@ApiTags('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOkResponse({ description: 'Collection of locations' })
  @ApiBadRequestResponse({ description: 'Invalid queries' })
  public getLocations(
    @Query() getLocationsDTO: GetLocationsDTO,
  ): Promise<Location[]> {
    return this.locationsService.getLocations(getLocationsDTO);
  }

  @Get(':latitude/:longitude')
  @ApiOkResponse({ description: 'One location' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid params' })
  public getLocation(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
  ): Promise<Location> {
    return this.locationsService.getLocation(latitude, longitude);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Added location' })
  @ApiConflictResponse({ description: 'Location already exists' })
  @ApiBadRequestResponse({ description: 'Invalid body' })
  @ApiBody({ type: AddLocationDTO })
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    return this.locationsService.addLocation(addLocationDTO);
  }

  @Patch(':latitude/:longitude/description')
  @ApiOkResponse({ description: 'Updated location' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid params or body' })
  @ApiBody({ type: UpdateLocationDescriptionBodyDTO })
  public updateLocationDescription(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { description }: UpdateLocationDescriptionBodyDTO,
  ): Promise<Location> {
    const updateLocationDescriptionDTO: UpdateLocationDescriptionDTO = new UpdateLocationDescriptionDTO(latitude, longitude, description);
    return this.locationsService.updateLocationDescription(updateLocationDescriptionDTO);
  }

  @Patch(':latitude/:longitude/fillingLevel')
  @ApiOkResponse({ description: 'Updated location' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBadRequestResponse({ description: 'Invalid params or body' })
  @ApiBody({ type: UpdateLocationDescriptionBodyDTO })
  public updateLocationFillingLevel(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { fillingLevel }: UpdateLocationFillingLevelBodyDTO,
  ): Promise<Location> {
    const updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO = new UpdateLocationFillingLevelDTO(latitude, longitude, fillingLevel);
    return this.locationsService.updateLocationFillingLevel(updateLocationFillingLevelDTO);
  }
}
