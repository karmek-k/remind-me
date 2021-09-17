import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';

export enum Channel {
  DISCORD = 'DISCORD'
}

registerEnumType(Channel, {
  name: 'Channel',
  description: 'Communication channel'
});

@ObjectType()
export class Reminder {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;

  @Field()
  message!: string;

  @Field(() => [Channel])
  channels!: Set<Channel>;
}
