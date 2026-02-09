import { ChildEntity, Column } from 'typeorm';
import { Item } from './item.entity';

@ChildEntity()
export class Armor extends Item {
  @Column({ nullable: true })
  protectionScore: number;

  @Column({ nullable: true })
  neededArmorProficiency: string;

  @Column({ nullable: true })
  movementPenalty: number;

  @Column({ nullable: true })
  armorCategory: string;

  getItemInfo() {}
}
