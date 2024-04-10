import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'unknown' })
  breed: string;

  @ManyToMany(() => User, user => user.favorites)
  @JoinTable()
  users: User[];
}
