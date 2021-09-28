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

@ObjectType({
  description: 'A reminder object that can have multiple ReminderJobs.'
})
@Entity()
export class Reminder extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ description: 'Notification title.' })
  @Column()
  title!: string;

  @Field({ nullable: true, description: 'Notification message/content.' })
  @Column({ nullable: true })
  message!: string;

  @Field({ description: 'The user that will be notified.' })
  @ManyToOne(() => User, user => user.reminders)
  user!: User;

  @Field(() => [ReminderJob], {
    description: 'ReminderJobs that trigger this reminder.'
  })
  @OneToMany(() => ReminderJob, job => job.reminder, {
    cascade: true,
    eager: true
  })
  jobs!: ReminderJob[];
}
