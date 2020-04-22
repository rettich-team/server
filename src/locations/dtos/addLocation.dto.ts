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
  @ApiProperty()
  public latitude: number;

  @IsNumber()
  @IsDoublePrecision()
  @IsLongitude()
  @ApiProperty()
  public longitude: number;

  @IsString()
  @MaxLength(Number(process.env.LOCATION_DESCRIPTION_MAX_LENGTH))
  @IsOptional()
  @ApiProperty()
  public description = '';

  @IsEnum(LocationFillingLevel)
  @IsOptional()
  @ApiProperty()
  public fillingLevel = LocationFillingLevel.FULL;
}
