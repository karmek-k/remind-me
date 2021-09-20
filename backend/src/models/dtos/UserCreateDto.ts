import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { BaseDto } from './BaseDto';

@InputType()
export class UserCreateDto implements BaseDto {
  @Field()
  @Length(3, 20)
  username!: string;

  @Field()
  @Length(5, 64)
  password!: string;
}
