import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { Dto } from './Dto';

@InputType()
export class UserLoginDto implements Dto {
  @Field()
  @Length(3, 20)
  username!: string;

  @Field()
  @Length(5, 64)
  password!: string;
}
