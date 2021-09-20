import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder } from '../models/Reminder';
import { reminderProvider } from '../services/providers/reminder';

@Resolver(Reminder)
export default class {
  @Query(() => [Reminder])
  async reminders() {
    return await reminderProvider.all();
  }

  @Query(() => Reminder, { nullable: true })
  async reminder(@Arg('id', () => Int) id: number) {
    return await reminderProvider.find(id);
  }

  @Mutation(() => Reminder)
  async addReminder(@Arg('reminderData') reminderData: ReminderCreateDto) {
    return await reminderProvider.insert(reminderData);
  }

  @Mutation(() => Reminder, { nullable: true })
  async removeReminder(@Arg('id', () => Int) id: number) {
    return await reminderProvider.delete(id);
  }
}
