import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocationsRepository } from './locations.repository';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationsRepository)
        private readonly locationsRepository: LocationsRepository
    ) {}
}
