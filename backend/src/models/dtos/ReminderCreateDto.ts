import { InputType, Field } from 'type-graphql';
import { Channel } from '../Reminder';

@InputType()
export class ReminderCreateDto {
  @Field()
  title!: string;

  @Field({ nullable: true })
  message!: string;

  @Field(() => [Channel])
  channels!: Set<Channel>;
}
