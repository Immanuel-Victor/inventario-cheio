import { Rpg } from 'src/rpg/entities/rpg.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'category' } })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @ManyToOne(() => Rpg)
  @JoinColumn({ name: 'rpgId' })
  rpg: Rpg;

  @Column()
  rpgId: string;

  getItemInfo() {}
}
