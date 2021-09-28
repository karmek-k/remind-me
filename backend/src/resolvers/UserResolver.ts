import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ForbiddenError } from 'apollo-server';
import { UserCreateDto } from '../models/dtos/UserCreateDto';
import { UserLoginDto } from '../models/dtos/UserLoginDto';
import { User } from '../models/User';
import { authService } from '../services/auth';
import { userProvider } from '../services/providers/user';

@Resolver(User)
export default class {
  @Query(() => String)
  async login(@Arg('credentials') credentials: UserLoginDto) {
    const { username, password } = credentials;
    const user = await User.findOne({
      where: { username },
      select: ['id', 'password']
    });
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await authService.verifyPassword(user, password))) {
      throw new ForbiddenError('Invalid credentials');
    }

    return authService.makeJwt({ id: user.id, username });
  }

  @Mutation(() => User)
  async addUser(@Arg('userData') userData: UserCreateDto) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('addUser is not available in production');
    }

    return await userProvider.insert(userData);
  }
}
