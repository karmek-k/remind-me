import { InputType } from 'type-graphql';
import { UserLoginDto } from './UserLoginDto';

@InputType({
  description: 'User credentials DTO used for creating a new user.'
})
export class UserCreateDto extends UserLoginDto {}
