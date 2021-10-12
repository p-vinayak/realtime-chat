import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  maxUserCount: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @OneToMany(() => User, (user) => user.room)
  users: User[];
}
