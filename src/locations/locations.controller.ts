import {
  Controller,
  Post,
  Body,
  NotImplementedException,
} from '@nestjs/common';

import { LocationsService } from './locations.service';
import { AddLocationDTO } from './dtos/addLocation.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    throw new NotImplementedException();
  }
}
