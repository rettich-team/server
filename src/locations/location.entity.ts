import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsLatitude, IsLongitude } from 'class-validator';

import { LocationFillingLevel } from './locationFillingLevel.enum';

@Entity()
export class Location extends BaseEntity {
  @PrimaryColumn({ type: 'double precision' })
  @IsLatitude()
  public latitude: number;

  @PrimaryColumn({ type: 'double precision' })
  @IsLongitude()
  public longitude: number;

  @Column({ length: Number(process.env.LOCATION_DESCRIPTION_MAX_LENGTH) })
  public description: string;

  @Column({
    type: 'enum',
    enum: LocationFillingLevel,
  })
  public fillingLevel: LocationFillingLevel;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
