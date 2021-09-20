import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { ReminderJobCreateDto } from '../models/dtos/ReminderJobCreateDto';
import { ReminderJob } from '../models/ReminderJob';
import { reminderJobProvider } from '../services/providers/reminderJob';

@Resolver(ReminderJob)
export default class {
  @Query(() => [ReminderJob])
  async jobsForReminder(@Arg('reminderId', () => Int) reminderId: number) {
    return await reminderJobProvider.findForReminder(reminderId);
  }

  @Mutation(() => ReminderJob)
  async addJob(@Arg('reminderJobData') reminderJobData: ReminderJobCreateDto) {
    return await reminderJobProvider.insert(reminderJobData);
  }

  @Mutation(() => ReminderJob, { nullable: true })
  async removeJob(@Arg('jobId', () => Int) jobId: number) {
    return await reminderJobProvider.delete(jobId);
  }
}
