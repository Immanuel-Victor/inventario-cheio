import { Item } from './item.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Weapon extends Item {
  @Column()
  damageScore: number;

  @Column()
  reach: number;

  @Column()
  criticalThreshold: string;

  @Column()
  criticalMultiplier: number;

  @Column()
  damageType: string;

  @Column()
  neededProficiency: string;

  getItemInfo() {}
}
