import { ReminderJob } from '../../models/ReminderJob';
import { ReminderJobCreateDto } from '../../models/dtos/ReminderJobCreateDto';
import { queueService } from '../queue';
import { reminderProvider } from './reminder';
import { Provider } from './Provider';
import { User } from '../../models/User';
import { loggerService } from '../logger';
import channelMap from '../channels/channelMap';
import { Reminder } from '../../models/Reminder';

class ReminderJobProvider implements Provider<ReminderJob> {
  async all() {
    return await ReminderJob.find();
  }

  async find(id: number) {
    return await ReminderJob.findOne(id);
  }

  async findForReminder(reminderId: number) {
    return await ReminderJob.find({
      where: {
        reminder: { id: reminderId }
      }
    });
  }

  async insert(reminderJobData: ReminderJobCreateDto, user?: User) {
    const { hour, minute, channels, reminderId } = reminderJobData;
    const reminder = await reminderProvider.find(reminderId);

    if (!reminder || !this.userHasReminder(user!, reminder)) {
      throw new Error(`Reminder with id ${reminderId} is not defined`);
    }

    const newJob = new ReminderJob();

    newJob.hour = hour;
    newJob.minute = minute;
    newJob.cron = `${minute} ${hour} * * *`;
    newJob.channels = channels;
    newJob.reminder = reminder;

    const data = await newJob.save();
    await queueService.addJob(newJob);

    loggerService.log(
      `User ${user?.username} has added a job #${newJob.id} for ${hour}:${minute}`
    );

    return data;
  }

  async delete(id: number, user?: User) {
    const toDelete = await this.getJob(id, user);

    await queueService.deleteJob(toDelete);
    await toDelete.remove();

    return Promise.resolve();
  }

  async setActive(id: number, active: boolean, user: User) {
    const job = await this.getJob(id, user);

    job.active = active;
    await job.save();
  }

  async trigger(id: number, user?: User) {
    let job: ReminderJob;

    if (user) {
      loggerService.log(`User ${user?.username} is triggering job #${id}`);
      job = await this.getJob(id, user);
    } else {
      const jobOrUndef = await ReminderJob.findOne(id, {
        relations: ['reminder']
      });
      if (!jobOrUndef) {
        throw new Error('Job does not exist');
      }

      job = jobOrUndef;
    }

    if (!job.active) {
      loggerService.log(`Job with id ${id} is inactive`, 'verbose');
      return;
    }

    const reminder = await reminderProvider.find(job.reminder.id, true);
    if (!reminder) {
      loggerService.log(
        `The reminder for job ${id} could not be found!`,
        'error'
      );
      return Promise.reject();
    }

    for (const channel of job.channels) {
      const transport = channelMap.get(channel);
      if (!transport) {
        loggerService.log(
          `The transport for channel ${channel} could not be found!`,
          'warning'
        );
        continue;
      }

      loggerService.log(
        `Sending a reminder titled '${reminder.title}' by channel ${channel}`,
        'verbose'
      );
      await transport.send(reminder);
    }

    return Promise.resolve();
  }

  private async getJob(jobId: number, user?: User) {
    const job = await ReminderJob.findOne(jobId, {
      relations: ['reminder']
    });
    if (!job || !this.userHasReminder(user!, job.reminder)) {
      throw new Error('Job does not exist');
    }

    return job;
  }

  private userHasReminder(user: User, reminder: Reminder) {
    return !!user!.reminders.find(userRem => userRem.id === reminder.id);
  }
}

export const reminderJobProvider = new ReminderJobProvider();
