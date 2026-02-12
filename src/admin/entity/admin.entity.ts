import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  email: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column({ default: false })
  isAllowed: boolean;
}
