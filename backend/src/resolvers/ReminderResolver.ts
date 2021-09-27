import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Authorized,
  Ctx
} from 'type-graphql';
import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder } from '../models/Reminder';
import { User } from '../models/User';
import { reminderProvider } from '../services/providers/reminder';

@Resolver(Reminder)
export default class {
  @Authorized()
  @Query(() => [Reminder])
  async reminders(@Ctx('user') user: User) {
    return user.reminders;
  }

  @Authorized()
  @Query(() => Reminder, { nullable: true })
  async reminder(@Ctx('user') user: User, @Arg('id', () => Int) id: number) {
    return user.reminders.find(rem => rem.id === id);
  }

  @Authorized()
  @Mutation(() => Reminder)
  async addReminder(
    @Ctx('user') user: User,
    @Arg('reminderData') reminderData: ReminderCreateDto
  ) {
    return await reminderProvider.insert(reminderData, user);
  }

  @Authorized()
  @Mutation(() => Reminder, { nullable: true })
  async removeReminder(
    @Ctx('user') user: User,
    @Arg('id', () => Int) id: number
  ) {
    return await reminderProvider.delete(id, user);
  }
}
