import { IsOptional, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { LocationFillingLevel } from '../locationFillingLevel.enum';

export class GetLocationsDTO {
    @IsEnum(LocationFillingLevel)
    @IsOptional()
    public fillingLevel?: LocationFillingLevel;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public partialDescription?: string;
}