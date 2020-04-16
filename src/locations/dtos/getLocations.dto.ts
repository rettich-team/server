import { IsOptional, IsEnum, IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../locationFillingLevel.enum';

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