import { Field, Int, ObjectType } from 'type-graphql';
import { ReminderJob } from './ReminderJob';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Reminder extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  message!: string;

  @Field()
  @ManyToOne(() => User, user => user.reminders)
  user!: User;

  @Field(() => [ReminderJob])
  @OneToMany(() => ReminderJob, job => job.reminder, {
    cascade: true,
    eager: true
  })
  jobs!: ReminderJob[];
}
