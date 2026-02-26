import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rpg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  description: string;

  @Column({ type: Number })
  launchYear: number;

  @Column({ type: String })
  publisher: string;

  @Column({ type: String })
  author: string;
}
