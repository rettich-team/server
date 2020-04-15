import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Type } from 'class-transformer';

import { IsDoublePrecision } from '../../shared/decorators/dtos/isDoublePrecision.decorator';

export class LocationCoordinatesParamsDTO {
    @IsNumber()
    @IsDoublePrecision()
    @IsLatitude()
    @Type(() => Number)
    public latitude: number;

    @IsNumber()
    @IsDoublePrecision()
    @IsLongitude()
    @Type(() => Number)
    public longitude: number;
}
