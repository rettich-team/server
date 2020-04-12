import { EntityRepository, Repository } from 'typeorm'

import { Location } from './location.entity';
  
@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {}