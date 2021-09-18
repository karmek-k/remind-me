import { ChannelTransport, ChannelType } from './channelTransport';
import { discordChannel } from './discord';
import { consoleChannel } from './console';

export default new Map<ChannelType, ChannelTransport>([
  [ChannelType.CONSOLE, consoleChannel],
  [ChannelType.DISCORD, discordChannel]
]);
