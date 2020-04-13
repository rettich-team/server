export class UpdateLocationDescriptionDTO {
    constructor(
        public readonly latitude: number, 
        public readonly longitude: number, 
        public readonly description: string
    ) {}
}
