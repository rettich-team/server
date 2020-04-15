import { IsOptional, IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
}