import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder } from '../models/Reminder';
import { reminderService } from '../services/reminderService';

@Resolver(Reminder)
export default class {
  @Query(() => [Reminder])
  reminders() {
    return reminderService.all();
  }

  @Query(() => Reminder, { nullable: true })
  reminder(@Arg('id') id: number) {
    return reminderService.find(id);
  }

  @Mutation(() => Reminder)
  addReminder(@Arg('reminderData') reminderData: ReminderCreateDto) {
    return reminderService.insert(reminderData);
  }

  @Mutation(() => Reminder, { nullable: true })
  removeReminder(@Arg('id') id: number) {
    return reminderService.delete(id);
  }
}
