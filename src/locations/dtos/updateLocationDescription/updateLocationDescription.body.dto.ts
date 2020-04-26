import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDescriptionBodyDTO {
    @IsString()
    @MaxLength(Number(process.env.LOCATION_DESCRIPTION_MAX_LENGTH))
    @ApiProperty()
    @ApiProperty({
        name: 'description',
        required: true,
        description: `The description of a location up to ${process.env.LOCATION_DESCRIPTION_MAX_LENGTH} characters.`,
        type: String
    })
    public description: string;
}
