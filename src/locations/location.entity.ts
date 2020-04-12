import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Min, Max } from 'class-validator';

import { LocationFillingLevel } from './locationFillingLevel.enum';

@Entity()
export class Location extends BaseEntity {
  @PrimaryColumn({
    type: 'real',
  })
  @Min(-90)
  @Max(90)
  latitude: number;

  @PrimaryColumn({
    type: 'real',
  })
  @Min(-180)
  @Max(180)
  longitude: number;

  @Column()
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
