import { Item } from './item.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Weapon extends Item {
  @Column({ nullable: true })
  damageScore: string;

  @Column({ nullable: true })
  reach: number;

  @Column({ nullable: true })
  critThreshold: string;

  @Column({ nullable: true })
  critMultiplier: number;

  @Column({ nullable: true })
  damageType: string;

  @Column({ nullable: true })
  neededWeaponProficiency: string;

  getItemInfo() {}
}
