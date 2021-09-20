import { ObjectType, Field, registerEnumType, Int } from 'type-graphql';
import { ChannelType } from '../services/channels/channelMap';

registerEnumType(ChannelType, {
  name: 'Channel',
  description: 'Communication channel'
});

@ObjectType()
export class ReminderJob {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  reminderId!: number;

  @Field()
  hour!: number;

  @Field()
  minute!: number;

  cron!: string;

  @Field(() => [ChannelType])
  channels!: ChannelType[];

  @Field({ defaultValue: false })
  active!: boolean;
}
