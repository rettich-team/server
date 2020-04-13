import { IsString, MaxLength } from 'class-validator';

export class UpdateLocationDescriptionByCoordinatesBodyDTO {
    @IsString()
    @MaxLength(3000)
    public description: string;
}
