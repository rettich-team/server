import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  public addLocation(
    @Body() addLocationDTO: AddLocationDTO,
  ): Promise<Location> {
    return this.locationsService.addLocation(addLocationDTO);
  }
}
