import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';
import { sendDiscordMessage } from '../../utils/discord';

class DiscordChannel implements ChannelTransport {
  async send(reminder: Reminder): Promise<void> {
    // TODO: load the webhook from somewhere else
    const webhook = process.env.TEST_WEBHOOK;
    if (!webhook) {
      throw new Error('TEST_WEBHOOK environment variable is not defined');
    }

    await sendDiscordMessage(webhook, reminder);
  }
}

export const discordChannel = new DiscordChannel();
