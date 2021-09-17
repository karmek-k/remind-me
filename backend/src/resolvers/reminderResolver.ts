import { Resolver, Query, Arg } from 'type-graphql';
import Reminder from '../models/Reminder';
import { reminderService } from '../services/reminderService';

@Resolver(Reminder)
export default class {
  @Query(() => [Reminder])
  reminders() {
    return reminderService.allReminders();
  }

  @Query(() => Reminder)
  reminder(@Arg('id') id: number) {
    return reminderService.oneReminder(id);
  }
}
