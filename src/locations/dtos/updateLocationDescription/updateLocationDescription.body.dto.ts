import { IsString, MaxLength } from 'class-validator';

export class UpdateLocationDescriptionBodyDTO {
    @IsString()
    @MaxLength(3000)
    public description: string;
}
