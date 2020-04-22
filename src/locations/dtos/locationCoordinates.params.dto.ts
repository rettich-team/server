import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsDoublePrecision } from '../../shared/decorators/isDoublePrecision.decorator';

export class LocationCoordinatesParamsDTO {
    @IsNumber()
    @IsDoublePrecision()
    @IsLatitude()
    @Type(() => Number)
    @ApiProperty()
    public latitude: number;

    @IsNumber()
    @IsDoublePrecision()
    @IsLongitude()
    @Type(() => Number)
    @ApiProperty()
    public longitude: number;
}
