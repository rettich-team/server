import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

import { Location } from './location.entity';
import { LocationsRepository } from './locations.repository';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';
import { GetLocationsDTO } from './dtos/getLocations.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsRepository)
        private readonly locationsRepository: LocationsRepository
    ) {}

    public getLocations(getLocationsDTO: GetLocationsDTO): Promise<Location[]> {
        return this.locationsRepository.getLocations(getLocationsDTO);
    }

    public async getLocation(latitude: number, longitude: number): Promise<Location> {
        const location: Location = await this.locationsRepository.getLocation(latitude, longitude);
        
        if (!location) {
            throw new NotFoundException(`Location at ${latitude},${longitude} not found.`);
        }

        return location;
    }

    public async addLocation(addLocationDTO: AddLocationDTO): Promise<Location> {
        const { latitude, longitude } = addLocationDTO;
        const existingLocation: Location = await this.locationsRepository.getLocation(latitude, longitude);      
        
        if (existingLocation) {
            throw new ConflictException(`Location at ${latitude},${longitude} already exists.`);
        }

        return this.locationsRepository.addLocation(addLocationDTO);
    }

    public async updateLocationDescription(updateLocationDescriptionDTO: UpdateLocationDescriptionDTO): Promise<Location> {
        const { latitude, longitude } = updateLocationDescriptionDTO;
        const updateResult: UpdateResult = await this.locationsRepository.updateLocationDescription(updateLocationDescriptionDTO);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Location at ${latitude},${longitude} not found.`);
        }

        return this.locationsRepository.getLocation(latitude, longitude);
    }

    public async updateLocationFillingLevel(updateLocationFillingLevelDTO: UpdateLocationFillingLevelDTO): Promise<Location> {
        const { latitude, longitude } = updateLocationFillingLevelDTO;
        const updateResult: UpdateResult = await this.locationsRepository.updateLocationFillingLevel(updateLocationFillingLevelDTO);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Location at ${latitude},${longitude} not found.`);
        }

        return this.locationsRepository.getLocation(latitude, longitude);
    }
}
