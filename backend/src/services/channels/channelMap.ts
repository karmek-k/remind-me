import { ChannelTransport } from './channelTransport';
import { discordChannel } from './discord';
import { consoleChannel } from './console';

export enum ChannelType {
  CONSOLE = 'CONSOLE',
  DISCORD = 'DISCORD'
}

export default new Map<ChannelType, ChannelTransport>([
  [ChannelType.CONSOLE, consoleChannel],
  [ChannelType.DISCORD, discordChannel]
]);
