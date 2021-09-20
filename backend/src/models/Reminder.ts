import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';
import { ReminderJob } from './ReminderJob';

@ObjectType()
export class Reminder {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  message!: string;

  @Field(() => [ReminderJob])
  jobs!: ReminderJob[];
}
