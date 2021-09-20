import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { BaseDto } from './BaseDto';

@InputType()
export class ReminderCreateDto implements BaseDto {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(255)
  message!: string;
}
