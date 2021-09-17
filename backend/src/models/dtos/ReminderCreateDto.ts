import { InputType, Field } from 'type-graphql';
import { Channel } from '../Reminder';
import { ArrayUnique, MaxLength } from 'class-validator';

@InputType()
export class ReminderCreateDto {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(255)
  message!: string;

  @Field(() => [Channel])
  @ArrayUnique()
  channels!: Set<Channel>;
}
