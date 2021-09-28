import { ObjectType, Field, registerEnumType, Int } from 'type-graphql';
import { ChannelType } from '../services/channels/channelMap';
import { Reminder } from './Reminder';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity
} from 'typeorm';

registerEnumType(ChannelType, {
  name: 'Channel',
  description: 'Communication channel (e.g. Discord, Slack etc).'
});

@ObjectType({
  description:
    'A repeated job that triggers sending a reminder, executed every day, for given hour and its minute.'
})
@Entity()
export class ReminderJob extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Reminder, {
    description: 'The Reminder that is triggerred by this job.'
  })
  @ManyToOne(() => Reminder, rem => rem.jobs)
  reminder!: Reminder;

  @Field(() => Int, { description: 'The hour this job is executed by.' })
  @Column()
  hour!: number;

  @Field(() => Int, {
    description: "The hour's minute this job is executed by."
  })
  @Column()
  minute!: number;

  @Column()
  cron!: string;

  @Field(() => [ChannelType], {
    description: 'The channels that receive this reminder.'
  })
  @Column('enum', { array: true, enum: ChannelType })
  channels!: ChannelType[];

  @Field({
    defaultValue: true,
    description: 'Whether this job should by processed.'
  })
  @Column({ default: true })
  active!: boolean;
}
