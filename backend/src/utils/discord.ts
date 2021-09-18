import axios from 'axios';
import { Reminder } from '../models/Reminder';

export interface Embed {
  title?: string;
  description?: string;
}

export async function sendDiscordMessage(webhook: string, reminder: Reminder) {
  const { title, message } = reminder;
  const embed: Embed = {
    title,
    description: message
  };

  await axios.post<void>(webhook, {
    embeds: [embed]
  });
}
