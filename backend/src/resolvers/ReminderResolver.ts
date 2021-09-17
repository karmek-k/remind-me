import { Resolver, Query, Arg } from 'type-graphql';
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
}
