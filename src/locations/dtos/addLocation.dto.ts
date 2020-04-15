import {
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../locationFillingLevel.enum';
import { IsDoublePrecision } from '../../shared/decorators/dtos/isDoublePrecision.decorator';

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
  @MaxLength(3000)
  @IsOptional()
  @Transform((description: string) => description || '')
  @ApiProperty()
  public description: string;

  @IsEnum(LocationFillingLevel)
  @IsOptional()
  @Transform(
    (fillingLevel: LocationFillingLevel) =>
      fillingLevel || LocationFillingLevel.FULL,
  )
  @ApiProperty()
  public fillingLevel?: LocationFillingLevel;
}
