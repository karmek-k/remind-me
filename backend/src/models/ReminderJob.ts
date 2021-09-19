import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { ChannelType } from '../services/channels/channelMap';

registerEnumType(ChannelType, {
  name: 'Channel',
  description: 'Communication channel'
});

@ObjectType()
export class ReminderJob {
  @Field(() => ID)
  id!: number;

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
