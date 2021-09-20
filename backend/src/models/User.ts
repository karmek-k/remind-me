import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Reminder } from './Reminder';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;

  @Field(() => [Reminder])
  @OneToMany(() => Reminder, rem => rem.user)
  reminders!: Reminder[];
}
