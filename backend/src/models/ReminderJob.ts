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
  description: 'Communication channel'
});

@ObjectType()
@Entity()
export class ReminderJob extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @ManyToOne(() => Reminder, rem => rem.jobs)
  reminder!: Reminder;

  @Field()
  @Column()
  hour!: number;

  @Field()
  @Column()
  minute!: number;

  @Column()
  cron!: string;

  @Field(() => [ChannelType])
  @Column('enum', { array: true, enum: ChannelType })
  channels!: ChannelType[];

  @Field({ defaultValue: true })
  @Column({ default: true })
  active!: boolean;
}
