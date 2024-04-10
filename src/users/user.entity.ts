import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cat } from '../cats/cat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: ['user']
  })
  role: 'user' | 'admin';

  @ManyToMany(() => Cat, cat => cat.users)
  favorites: Cat[];
}
