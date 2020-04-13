import { LocationFillingLevel } from '../../locationFillingLevel.enum';

export class UpdateLocationFillingLevelDTO {
    constructor(
        public readonly latitude: number, 
        public readonly longitude: number, 
        public readonly fillingLevel: LocationFillingLevel
    ) {}
}
