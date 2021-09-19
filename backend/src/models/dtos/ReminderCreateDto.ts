import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class ReminderCreateDto {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(255)
  message!: string;
}
