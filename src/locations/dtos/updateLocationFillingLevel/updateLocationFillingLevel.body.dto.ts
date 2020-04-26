import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LocationFillingLevel } from '../../locationFillingLevel.enum';

export class UpdateLocationFillingLevelBodyDTO {
    @IsEnum(LocationFillingLevel)
    @ApiProperty({
        name: 'fillingLevel',
        required: true,
        description: `The filling level of a location.`,
        type: LocationFillingLevel,
        enum: LocationFillingLevel,
        enumName: 'LocationFillingLevel'
    })
    public fillingLevel: LocationFillingLevel;
}
