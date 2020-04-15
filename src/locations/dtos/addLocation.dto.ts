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

import { LocationFillingLevel } from '../locationFillingLevel.enum';
import { IsDoublePrecision } from '../../shared/decorators/dtos/isDoublePrecision.decorator';

export class AddLocationDTO {
  @IsNumber()
  @IsDoublePrecision()
  @IsLatitude()
  public latitude: number;

  @IsNumber()
  @IsDoublePrecision()
  @IsLongitude()
  public longitude: number;

  @IsString()
  @MaxLength(3000)
  @IsOptional()
  @Transform((description: string) => description || '')
  public description: string;

  @IsEnum(LocationFillingLevel)
  @IsOptional()
  @Transform(
    (fillingLevel: LocationFillingLevel) =>
      fillingLevel || LocationFillingLevel.FULL,
  )
  public fillingLevel?: LocationFillingLevel;
}
