import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';

class DiscordChannel implements ChannelTransport {
  send(reminder: Reminder): Promise<void> {
    // TODO: implement
    return Promise.reject();
  }
}

export const discordChannel = new DiscordChannel();
