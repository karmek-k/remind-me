import { Provider } from './Provider';
import { User } from '../../models/User';
import { UserCreateDto } from '../../models/dtos/UserCreateDto';
import argon2 from 'argon2';

class UserProvider implements Provider<User> {
  async all(): Promise<User[]> {
    // TODO: make this only available to admins

    return await User.find();
  }

  async find(id: number): Promise<User | undefined> {
    return await User.findOne(id);
  }

  async insert(data: UserCreateDto): Promise<User> {
    const user = new User();
    user.username = data.username;
    user.password = await argon2.hash(data.password);

    return await user.save();
  }

  async delete(id: number): Promise<void> {
    // TODO: make this only available to admins

    const toDelete = await User.findOne(id);
    if (!toDelete) {
      return Promise.reject('User does not exist');
    }

    await toDelete.remove();

    return Promise.resolve();
  }
}

export const userProvider = new UserProvider();
