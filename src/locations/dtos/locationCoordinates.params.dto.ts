import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsDoublePrecision } from '../../shared/decorators/isDoublePrecision.decorator';

export class LocationCoordinatesParamsDTO {
    @IsNumber()
    @IsDoublePrecision()
    @IsLatitude()
    @Type(() => Number)
    @ApiProperty({
        name: 'latitude',
        required: true,
        description: 'The latitude of a location up to 15 decimal digits.',
        type: Number
    })
    public latitude: number;

    @IsNumber()
    @IsDoublePrecision()
    @IsLongitude()
    @Type(() => Number)
    @ApiProperty({
        name: 'longitude',
        required: true,
        description: 'The longitude of a location up to 15 decimal digits.',
        type: Number
    })
    public longitude: number;
}
