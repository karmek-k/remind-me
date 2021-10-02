import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';
import { sendDiscordMessage } from '../../utils/discord';

class DiscordChannel implements ChannelTransport {
  async send(reminder: Reminder): Promise<void> {
    await sendDiscordMessage(reminder.webhooks.discord, reminder);
  }
}

export const discordChannel = new DiscordChannel();
