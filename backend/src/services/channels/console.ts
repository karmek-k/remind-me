import { Reminder } from '../../models/Reminder';
import { loggerService } from '../loggerService';
import { ChannelTransport } from './channelTransport';

class ConsoleChannel implements ChannelTransport {
  send(reminder: Reminder): Promise<void> {
    const message = `

New message!
Title: ${reminder.title}
Message: ${reminder.message}

`;
    loggerService.log(message);

    return Promise.resolve();
  }
}

export const consoleChannel = new ConsoleChannel();
