import { ConnectionOptions } from 'typeorm';
import { Reminder } from '../models/Reminder';
import { ReminderJob } from '../models/ReminderJob';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Reminder, ReminderJob],
  synchronize: true
};
