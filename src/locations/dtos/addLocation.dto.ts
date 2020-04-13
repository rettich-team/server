import {
  IsNumber,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { LocationFillingLevel } from '../locationFillingLevel.enum';

export class AddLocationDTO {
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
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
