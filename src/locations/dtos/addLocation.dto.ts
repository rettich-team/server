import {
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../locationFillingLevel.enum';
import { IsDoublePrecision } from '../../shared/decorators/isDoublePrecision.decorator';

export class AddLocationDTO {
  @IsNumber()
  @IsDoublePrecision()
  @IsLatitude()
  @ApiProperty({
    name: 'latitude',
    required: true,
    description: 'The latitude of a location up to 15 decimal digits.',
    type: Number
  })
  public latitude: number;

  @IsNumber()
  @IsDoublePrecision()
  @IsLongitude()
  @ApiProperty({
    name: 'longitude',
    required: true,
    description: 'The longitude of a location up to 15 decimal digits.',
    type: Number
  })
  public longitude: number;

  @IsString()
  @MaxLength(Number(process.env.LOCATION_DESCRIPTION_MAX_LENGTH))
  @IsOptional()
  @ApiProperty({
    name: 'description',
    required: false,
    description: `The description of a location up to ${process.env.LOCATION_DESCRIPTION_MAX_LENGTH} characters.`,
    type: String,
    default: ''
  })
  public description = '';

  @IsEnum(LocationFillingLevel)
  @IsOptional()
  @ApiProperty({
    name: 'fillingLevel',
    required: false,
    description: `The filling level of a location.`,
    type: LocationFillingLevel,
    enum: LocationFillingLevel,
    enumName: 'LocationFillingLevel',
    default: LocationFillingLevel.FULL
  })
  public fillingLevel = LocationFillingLevel.FULL;
}
