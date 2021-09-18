import axios from 'axios';
import { Reminder } from '../models/Reminder';

export async function sendDiscordMessage(webhook: string, reminder: Reminder) {
  const { title, message } = reminder;

  await axios.post<void>(webhook, {
    content: `${title}:\n${message}`
  });
}
