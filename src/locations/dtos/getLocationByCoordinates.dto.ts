import { IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLocationByCoordinatesDTO {
    @IsNumber()
    @Min(-90)
    @Max(90)
    @Type(() => Number)
    public latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    @Type(() => Number)
    public longitude: number;
}
