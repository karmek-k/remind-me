import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { Dto } from './Dto';

@InputType({ description: 'User credentials DTO used for logging in.' })
export class UserLoginDto implements Dto {
  @Field({ description: '3-20 characters.' })
  @Length(3, 20)
  username!: string;

  @Field({ description: '5-64 characters.' })
  @Length(5, 64)
  password!: string;
}
