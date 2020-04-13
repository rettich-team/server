import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Location } from './location.entity';
import { LocationsRepository } from './locations.repository';
import { AddLocationDTO } from './dtos/addLocation.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsRepository)
        private readonly locationsRepository: LocationsRepository
    ) {}

    public async addLocation(addLocationDTO: AddLocationDTO): Promise<Location> {
        const { latitude, longitude } = addLocationDTO;
        const existingLocation: Location = await this.locationsRepository.getLocationByCoordinates(latitude, longitude);      
        
        if (existingLocation) {
            throw new ConflictException(`Location at ${latitude},${longitude} already exists.`);
        }

        return this.locationsRepository.addLocation(addLocationDTO);
    }
}
