import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../../locationFillingLevel.enum';

export class UpdateLocationFillingLevelBodyDTO {
    @IsEnum(LocationFillingLevel)
    @ApiProperty()
    public fillingLevel: LocationFillingLevel;
}
