import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql';
import { ReminderJobCreateDto } from '../models/dtos/ReminderJobCreateDto';
import { ReminderJob } from '../models/ReminderJob';
import { User } from '../models/User';
import { reminderJobProvider } from '../services/providers/reminderJob';

@Resolver(ReminderJob)
export default class {
  @Authorized()
  @Mutation(() => ReminderJob)
  async addJob(
    @Ctx('user') user: User,
    @Arg('reminderJobData') reminderJobData: ReminderJobCreateDto
  ) {
    return await reminderJobProvider.insert(reminderJobData, user);
  }

  @Authorized()
  @Mutation(() => ReminderJob, { nullable: true })
  async removeJob(
    @Ctx('user') user: User,
    @Arg('jobId', () => Int) jobId: number
  ) {
    return await reminderJobProvider.delete(jobId, user);
  }
}
