import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Reminder } from './Reminder';

@ObjectType({ description: 'An API user.' })
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Field(() => [Reminder], { description: "The user's reminders." })
  @OneToMany(() => Reminder, rem => rem.user, {
    eager: true
  })
  reminders!: Reminder[];
}
