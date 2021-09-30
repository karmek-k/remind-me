import { Field, Int, ObjectType } from 'type-graphql';
import { ReminderJob } from './ReminderJob';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { WebhookConfig } from './WebhookConfig';

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
  @ManyToOne(() => User, user => user.reminders, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  user!: User;

  @Field(() => [ReminderJob], {
    description: 'ReminderJobs that trigger this reminder.'
  })
  @OneToMany(() => ReminderJob, job => job.reminder, {
    eager: true
  })
  jobs!: ReminderJob[];

  @Field(() => WebhookConfig, { description: 'Webhooks for this reminder' })
  @OneToOne(() => WebhookConfig)
  @JoinColumn()
  webhooks!: WebhookConfig;
}
