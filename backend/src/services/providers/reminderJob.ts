import { ReminderJob } from '../../models/ReminderJob';
import { ReminderJobCreateDto } from '../../models/dtos/ReminderJobCreateDto';
import { queueService } from '../queue';
import { reminderProvider } from './reminder';
import { Provider } from './Provider';
import { User } from '../../models/User';

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

    if (!reminder || !user!.reminders.includes(reminder)) {
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

    return data;
  }

  async delete(id: number, user?: User) {
    const toDelete = await ReminderJob.findOne(id, { relations: ['reminder'] });

    if (!toDelete || !user!.reminders.includes(toDelete.reminder)) {
      return Promise.reject('Job does not exist');
    }

    await queueService.deleteJob(toDelete);
    await toDelete.remove();

    return Promise.resolve();
  }

  async setActive(id: number, active: boolean, user: User) {
    const job = await ReminderJob.findOne(id, { relations: ['reminder'] });
    if (!job || !user.reminders.includes(job.reminder)) {
      throw new Error('Job does not exist');
    }

    job.active = active;
  }
}

export const reminderJobProvider = new ReminderJobProvider();
