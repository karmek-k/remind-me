import { ReminderJob } from '../../models/ReminderJob';
import { ReminderJobCreateDto } from '../../models/dtos/ReminderJobCreateDto';
import { queueService } from '../queue';
import { reminderProvider } from './reminder';

class ReminderJobProvider {
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

  async insert(reminderJobData: ReminderJobCreateDto) {
    const { hour, minute, channels, reminderId } = reminderJobData;
    const reminder = await reminderProvider.find(reminderId);

    if (!reminder) {
      return null;
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

  async delete(id: number) {
    const toDelete = await ReminderJob.findOne(id);
    if (!toDelete) {
      return null;
    }

    const data = await toDelete.remove();
    await queueService.deleteJob(toDelete);

    return data;
  }
}

export const reminderJobProvider = new ReminderJobProvider();
