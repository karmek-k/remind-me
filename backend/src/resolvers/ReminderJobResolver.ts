import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql';
import { ReminderJobCreateDto } from '../models/dtos/ReminderJobCreateDto';
import { Reminder } from '../models/Reminder';
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
    const { JOBS_PER_REMINDER } = process.env;
    if (JOBS_PER_REMINDER) {
      const maxJobs = Number.parseInt(JOBS_PER_REMINDER);
      const reminder = await Reminder.findOne(reminderJobData.reminderId);

      if (
        reminder &&
        !Number.isNaN(maxJobs) &&
        reminder.jobs.length >= maxJobs
      ) {
        throw new Error(
          'You are not allowed to create more jobs for this reminder'
        );
      }
    }

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

  @Authorized()
  @Mutation(() => ReminderJob, {
    nullable: true,
    description: 'Sets whether the job is active or not.'
  })
  async setActive(
    @Ctx('user') user: User,
    @Arg('jobId', () => Int) jobId: number,
    @Arg('active') active: boolean
  ) {
    await reminderJobProvider.setActive(jobId, active, user);
  }

  @Authorized()
  @Mutation(() => ReminderJob, {
    nullable: true,
    description: 'Triggers the job with given ID.'
  })
  async triggerJob(
    @Ctx('user') user: User,
    @Arg('jobId', () => Int) jobId: number
  ) {
    await reminderJobProvider.trigger(jobId, user);
  }
}
