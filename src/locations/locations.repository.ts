import { EntityRepository, Repository } from 'typeorm'

import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';

@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {
    public getLocationByCoordinates(latitude: number, longitude: number): Promise<Location> {
        return this.findOne({ latitude, longitude });
    }
    
    public addLocation(addLocationDTO: AddLocationDTO): Promise<Location> {
        const location: Location = new Location();
        location.latitude = addLocationDTO.latitude;
        location.longitude = addLocationDTO.longitude;
        location.description = addLocationDTO.description;
        location.fillingLevel = addLocationDTO.fillingLevel;
        
        return location.save();
    }
}
