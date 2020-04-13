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
  @PrimaryColumn({ type: 'real' })
  @Min(-90)
  @Max(90)
  public latitude: number;

  @PrimaryColumn({ type: 'real' })
  @Min(-180)
  @Max(180)
  public longitude: number;

  @Column({ length: 3000 })
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
