import { Arg, Int, Query, Resolver } from 'type-graphql';
import { ReminderJob } from '../models/ReminderJob';
import { reminderJobProvider } from '../services/providers/reminderJob';

@Resolver(ReminderJob)
export default class {
  @Query(() => [ReminderJob])
  jobsForReminder(@Arg('reminderId', () => Int) reminderId: number) {
    return reminderJobProvider.findForReminder(reminderId);
  }
}
