import { IsOptional, IsEnum, IsNotEmpty, IsString, IsInt, IsNumber, IsLatitude, IsLongitude, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../locationFillingLevel.enum';
import { IsDoublePrecision } from '../../shared/decorators/isDoublePrecision.decorator';

export class GetLocationsDTO {
    @IsEnum(LocationFillingLevel)
    @IsOptional()
    @ApiProperty({
        name: 'fillingLevel',
        required: false,
        description: `The filling level of a location.`,
        type: LocationFillingLevel,
        enum: LocationFillingLevel,
        enumName: 'LocationFillingLevel',
    })
    public fillingLevel?: LocationFillingLevel;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'partialDescription',
        required: false,
        description: `Check if the location description contains this substring.`,
        type: String,
    })
    public partialDescription?: string;

    @IsNumber()
    @IsDoublePrecision()
    @IsLatitude()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.longitude !== undefined || getLocationsDTO.radiusInKilometers !== undefined)
    @Type(() => Number)
    @ApiProperty({
        name: 'latitude',
        required: false,
        description: 'The latitude of a location up to 15 decimal digits. Required for longitude and radiusInKilometers.',
        type: Number
    })
    public latitude?: number;

    @IsNumber()
    @IsDoublePrecision()
    @IsLongitude()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.latitude !== undefined || getLocationsDTO.radiusInKilometers !== undefined)
    @Type(() => Number)
    @ApiProperty({
        name: 'longitude',
        required: false,
        description: 'The longitude of a location up to 15 decimal digits. Required for latitude and radiusInKilometers.',
        type: Number
    })
    public longitude?: number;

    @IsNumber()
    @ValidateIf((getLocationsDTO: GetLocationsDTO) => getLocationsDTO.latitude !== undefined || getLocationsDTO.longitude !== undefined)
    @Type(() => Number)
    @ApiProperty({
        name: 'radiusInKilometers',
        required: false,
        description: 'Filter radius in kilometers. Required for latitude and longitude.',
        type: Number
    })
    public radiusInKilometers?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({
        name: 'skip',
        required: false,
        description: 'Number of entities to skip.',
        type: Number
    })
    public skip?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({
        name: 'take',
        required: false,
        description: 'Number of entities to take.',
        type: Number
    })
    public take?: number;
}