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
  @Query(() => [Reminder], {
    description: 'Fetches all reminders of the current user.'
  })
  async reminders(@Ctx('user') user: User) {
    return user.reminders;
  }

  @Authorized()
  @Query(() => Reminder, {
    nullable: true,
    description: 'Finds a reminder of the current user by its ID.'
  })
  async reminder(@Ctx('user') user: User, @Arg('id', () => Int) id: number) {
    return user.reminders.find(rem => rem.id === id);
  }

  @Authorized()
  @Mutation(() => Reminder, { description: 'Adds a reminder.' })
  async addReminder(
    @Ctx('user') user: User,
    @Arg('reminderData') reminderData: ReminderCreateDto
  ) {
    return await reminderProvider.insert(reminderData, user);
  }

  @Authorized()
  @Mutation(() => Reminder, {
    nullable: true,
    description: 'Removes the reminder with given ID.'
  })
  async removeReminder(
    @Ctx('user') user: User,
    @Arg('id', () => Int) id: number
  ) {
    return await reminderProvider.delete(id, user);
  }
}
