import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql';
import { ReminderJobCreateDto } from '../models/dtos/ReminderJobCreateDto';
import { ReminderJob } from '../models/ReminderJob';
import { User } from '../models/User';
import { reminderJobProvider } from '../services/providers/reminderJob';

@Resolver(ReminderJob)
export default class {
  @Authorized()
  @Mutation(() => ReminderJob, {
    description: 'Creates a reminder job for the given Reminder.'
  })
  async addJob(
    @Ctx('user') user: User,
    @Arg('reminderJobData') reminderJobData: ReminderJobCreateDto
  ) {
    return await reminderJobProvider.insert(reminderJobData, user);
  }

  @Authorized()
  @Mutation(() => ReminderJob, {
    nullable: true,
    description: 'Deletes a reminder job for the given Reminder.'
  })
  async removeJob(
    @Ctx('user') user: User,
    @Arg('jobId', () => Int) jobId: number
  ) {
    return await reminderJobProvider.delete(jobId, user);
  }
}
