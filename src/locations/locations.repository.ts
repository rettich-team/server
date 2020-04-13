import { EntityRepository, Repository, UpdateResult } from 'typeorm'

import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';

@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {
    public getLocations(): Promise<Location[]> {
        return this.find();
    }
    
    public getLocation(latitude: number, longitude: number): Promise<Location> {
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

    public async updateLocationDescription({ latitude, longitude, description }: UpdateLocationDescriptionDTO): Promise<UpdateResult> {
        return this.update({ 
            latitude, 
            longitude 
        }, { 
            description
        });
    }

    public async updateLocationFillingLevel({ latitude, longitude, fillingLevel }: UpdateLocationFillingLevelDTO): Promise<UpdateResult> {
        return this.update({ 
            latitude, 
            longitude 
        }, { 
            fillingLevel
        });
    }
}
