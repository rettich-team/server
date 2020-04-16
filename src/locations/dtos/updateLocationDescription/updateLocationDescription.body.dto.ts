import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDescriptionBodyDTO {
    @IsString()
    @MaxLength(Number(process.env.LOCATION_DESCRIPTION_MAX_LENGTH))
    @ApiProperty()
    public description: string;
}
