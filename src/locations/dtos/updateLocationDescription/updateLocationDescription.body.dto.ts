import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDescriptionBodyDTO {
    @IsString()
    @MaxLength(3000)
    @ApiProperty()
    public description: string;
}
