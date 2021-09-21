import { ConnectionOptions } from 'typeorm';
import { Reminder } from '../models/Reminder';
import { ReminderJob } from '../models/ReminderJob';
import { User } from '../models/User';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Reminder, ReminderJob],
  synchronize: true
};
