import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserCreateDto } from '../models/dtos/UserCreateDto';
import { User } from '../models/User';
import { userProvider } from '../services/providers/user';

@Resolver(User)
export default class {
  @Mutation(() => User)
  async addUser(@Arg('userData') userData: UserCreateDto) {
    return await userProvider.insert(userData);
  }
}
