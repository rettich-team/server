export class UpdateLocationDescriptionByCoordinatesDTO {
    constructor(
        public readonly latitude: number, 
        public readonly longitude: number, 
        public readonly description: string
    ) {}
}
