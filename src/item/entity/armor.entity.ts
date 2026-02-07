import { ChildEntity, Column } from 'typeorm';
import { Item } from './item.entity';

@ChildEntity()
export class Armor extends Item {
  @Column()
  protectionScore: number;

  @Column()
  neededArmorProficiency: string;

  @Column()
  movementPenalty: number;

  @Column()
  armorCategory: string;

  getItemInfo() {}
}
