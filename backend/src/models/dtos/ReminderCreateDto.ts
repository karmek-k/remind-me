import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Dto } from './Dto';

@InputType()
export class ReminderCreateDto implements Dto {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(255)
  message!: string;
}
