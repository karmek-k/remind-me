import { InputType } from 'type-graphql';
import { UserLoginDto } from './UserLoginDto';

@InputType()
export class UserCreateDto extends UserLoginDto {}
