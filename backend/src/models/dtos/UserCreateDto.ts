import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserCreateDto {
  @Field()
  @Length(3, 20)
  username!: string;

  @Field()
  @Length(5, 64)
  password!: string;
}
