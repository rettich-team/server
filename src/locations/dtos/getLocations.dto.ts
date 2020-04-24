import { IsOptional, IsEnum, IsNotEmpty, IsString, IsInt, IsNumber, IsLatitude, IsLongitude, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../locationFillingLevel.enum';
import { IsDoublePrecision } from '../../shared/decorators/isDoublePrecision.decorator';

export class GetLocationsDTO {
    @IsEnum(LocationFillingLevel)
    @IsOptional()
    @ApiProperty()
    public fillingLevel?: LocationFillingLevel;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    public partialDescription?: string;

    @IsNumber()
    @IsDoublePrecision()
    @IsLatitude()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.longitude !== undefined || getLocationsDTO.longitude !== undefined)
    @Type(() => Number)
    @ApiProperty()
    public latitude?: number;

    @IsNumber()
    @IsDoublePrecision()
    @IsLongitude()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.latitude !== undefined || getLocationsDTO.radiusInKilometers !== undefined)
    @Type(() => Number)
    @ApiProperty()
    public longitude?: number;

    @IsNumber()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.latitude !== undefined || getLocationsDTO.longitude !== undefined)
    @Type(() => Number)
    @ApiProperty()
    public radiusInKilometers?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty()
    public skip?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty()
    public take?: number;
}