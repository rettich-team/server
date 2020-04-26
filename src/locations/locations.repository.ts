import { EntityRepository, Repository, UpdateResult, SelectQueryBuilder } from 'typeorm'

import { Location } from './location.entity';
import { AddLocationDTO } from './dtos/addLocation.dto';
import { UpdateLocationDescriptionDTO } from './dtos/updateLocationDescription/updateLocationDescription.dto';
import { UpdateLocationFillingLevelDTO } from './dtos/updateLocationFillingLevel/updateLocationFillingLevel.dto';
import { GetLocationsDTO } from './dtos/getLocations.dto';

@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {
    public getLocations({ fillingLevel, partialDescription, skip, take, latitude, longitude, radiusInKilometers }: GetLocationsDTO): Promise<Location[]> {
        const query: SelectQueryBuilder<Location> = this.createQueryBuilder('location');

        if (fillingLevel) {
            query.andWhere("location.fillingLevel = :fillingLevel", { fillingLevel });
        }

        if (partialDescription) {
            query.andWhere("location.description LIKE :description", { description: `%${partialDescription}%` });
        }

        if(latitude && longitude && radiusInKilometers) {
            query.andWhere(`6371 * acos(
                                cos(radians(:latitude)) *
                                cos(radians(location.latitude)) *
                                cos(radians(location.longitude) - radians(:longitude)) +
                                sin(radians(:latitude)) *
                                sin(radians(location.latitude))
                            ) <= :radiusInKilometers`, { 
                latitude,
                longitude,
                radiusInKilometers, 
            });
        }

        return query
            .skip(skip)
            .take(take)
            .getMany();
    }
    
    public getLocation(latitude: number, longitude: number): Promise<Location> {
        return this.findOne({ latitude, longitude });
    }
    
    public addLocation(addLocationDTO: AddLocationDTO): Promise<Location> {
        const location: Location = this.create();
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
