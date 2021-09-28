import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { Dto } from './Dto';

@InputType({ description: 'DTO for creating a reminder.' })
export class ReminderCreateDto implements Dto {
  @Field({ description: 'At most 30 characters.' })
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true, description: 'At most 255 characters.' })
  @MaxLength(255)
  message!: string;
}
