import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

import { Location } from './location.entity';
import { LocationsRepository } from './locations.repository';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { UpdateLocationDescriptionByCoordinatesDTO } from './dtos/updateLocationDescription/updateLocationDescriptionByCoordinates.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsRepository)
        private readonly locationsRepository: LocationsRepository
    ) {}

    public getLocations(): Promise<Location[]> {
        return this.locationsRepository.getLocations();
    }

    public async getLocationByCoordinates(latitude: number, longitude: number): Promise<Location> {
        const location: Location = await this.locationsRepository.getLocationByCoordinates(latitude, longitude);
        
        if (!location) {
            throw new NotFoundException(`Location at ${latitude},${longitude} not found.`);
        }

        return location;
    }

    public async addLocation(addLocationDTO: AddLocationDTO): Promise<Location> {
        const { latitude, longitude } = addLocationDTO;
        const existingLocation: Location = await this.locationsRepository.getLocationByCoordinates(latitude, longitude);      
        
        if (existingLocation) {
            throw new ConflictException(`Location at ${latitude},${longitude} already exists.`);
        }

        return this.locationsRepository.addLocation(addLocationDTO);
    }

    public async updateLocationDescription(updateLocationDescriptionByCoordinatesDTO: UpdateLocationDescriptionByCoordinatesDTO): Promise<Location> {
        const { latitude, longitude } = updateLocationDescriptionByCoordinatesDTO;
        const updateResult: UpdateResult = await this.locationsRepository.updateLocationDescription(updateLocationDescriptionByCoordinatesDTO);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Location at ${latitude},${longitude} not found.`);
        }

        return this.locationsRepository.getLocationByCoordinates(latitude, longitude);
    }
}
