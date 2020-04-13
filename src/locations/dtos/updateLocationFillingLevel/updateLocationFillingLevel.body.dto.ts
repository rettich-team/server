import { IsEnum } from 'class-validator';

import { LocationFillingLevel } from '../../locationFillingLevel.enum';

export class UpdateLocationFillingLevelBodyDTO {
    @IsEnum(LocationFillingLevel)
    public fillingLevel: LocationFillingLevel;
}
