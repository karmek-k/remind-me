import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { ChannelType } from '../services/channels/channelMap';

registerEnumType(ChannelType, {
  name: 'Channel',
  description: 'Communication channel'
});

@ObjectType()
export class Reminder {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  message!: string;

  @Field(() => [ChannelType])
  channels!: ChannelType[];

  @Field()
  hour!: number;

  @Field()
  minute!: number;

  cron!: string;

  @Field({ defaultValue: false })
  active!: boolean;
}
