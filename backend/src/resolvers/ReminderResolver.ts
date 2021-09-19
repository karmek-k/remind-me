import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder } from '../models/Reminder';
import { reminderProvider } from '../services/providers/reminder';

@Resolver(Reminder)
export default class {
  @Query(() => [Reminder])
  reminders() {
    return reminderProvider.all();
  }

  @Query(() => Reminder, { nullable: true })
  reminder(@Arg('id') id: number) {
    return reminderProvider.find(id);
  }

  @Mutation(() => Reminder)
  addReminder(@Arg('reminderData') reminderData: ReminderCreateDto) {
    return reminderProvider.insert(reminderData);
  }

  @Mutation(() => Reminder, { nullable: true })
  removeReminder(@Arg('id') id: number) {
    return reminderProvider.delete(id);
  }
}
