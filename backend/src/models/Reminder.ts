import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { ChannelType } from '../services/channels/ChannelTransport';

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
  channels!: Set<ChannelType>;

  @Field({ defaultValue: false })
  active!: boolean;
}
