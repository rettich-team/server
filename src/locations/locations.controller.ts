import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  BadRequestException,
  NotFoundException,
  ConflictException
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
  ApiOperation,
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
  @ApiOperation({ summary: 'Get filtered locations.' })
  @ApiOkResponse({ 
    description: 'A collection of filtered locations.',
    type: Location,
    isArray: true,
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid queries.',
    type: BadRequestException,
  })
  // @ApiQuery({ type: GetLocationsDTO })
  public getLocations(
    @Query() getLocationsDTO: GetLocationsDTO,
  ): Promise<Location[]> {
    return this.locationsService.getLocations(getLocationsDTO);
  }

  @Get(':latitude/:longitude')
  @ApiOperation({ summary: 'Get one location.' })
  @ApiOkResponse({ 
    description: 'The found location.',
    type: Location,
  })
  @ApiNotFoundResponse({ 
    description: 'Location not found.',
    type: NotFoundException, 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid params.',
    type: BadRequestException, 
  })
  // @ApiParam({ type: LocationCoordinatesParamsDTO })
  public getLocation(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
  ): Promise<Location> {
    return this.locationsService.getLocation(latitude, longitude);
  }

  @Post()
  @ApiOperation({ summary: 'Add a location.' })
  @ApiCreatedResponse({ 
    description: 'The added location.',
    type: Location,
  })
  @ApiConflictResponse({ 
    description: 'The location already exists.',
    type: ConflictException, 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid body.',
    type: BadRequestException, 
  })
  @ApiBody({ type: AddLocationDTO })
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    return this.locationsService.addLocation(addLocationDTO);
  }

  @Patch(':latitude/:longitude/description')
  @ApiOperation({ summary: 'Update the description of a location.' })
  @ApiOkResponse({ 
    description: 'The updated location.',
    type: Location, 
  })
  @ApiNotFoundResponse({ 
    description: 'The location was not found.',
    type: NotFoundException, 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid params or body.',
    type: BadRequestException, 
  })
  // @ApiParam({  })
  @ApiBody({ type: UpdateLocationDescriptionBodyDTO })
  public updateLocationDescription(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { description }: UpdateLocationDescriptionBodyDTO,
  ): Promise<Location> {
    const updateLocationDescriptionDTO: UpdateLocationDescriptionDTO = new UpdateLocationDescriptionDTO(latitude, longitude, description);
    return this.locationsService.updateLocationDescription(updateLocationDescriptionDTO);
  }

  @Patch(':latitude/:longitude/fillingLevel')
  @ApiOperation({ summary: 'Update the filling level of a location.' })
  @ApiOkResponse({ 
    description: 'The updated location.',
    type: Location,
  })
  @ApiNotFoundResponse({ 
    description: 'The location was not found.',
    type: NotFoundException, 
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid params or body.',
    type: BadRequestException, 
  })
  // @ApiParam({  })
  @ApiBody({ type: UpdateLocationDescriptionBodyDTO })
  public updateLocationFillingLevel(
    @Param() { latitude, longitude }: LocationCoordinatesParamsDTO,
    @Body() { fillingLevel }: UpdateLocationFillingLevelBodyDTO,
  ): Promise<Location> {
    const updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO = new UpdateLocationFillingLevelDTO(latitude, longitude, fillingLevel);
    return this.locationsService.updateLocationFillingLevel(updateLocationFillingLevelDTO);
  }
}
