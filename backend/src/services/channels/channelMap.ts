import { ChannelTransport, ChannelType } from './ChannelTransport';
import { discordChannel } from './discord';

export default new Map<ChannelType, ChannelTransport>([
  [ChannelType.DISCORD, discordChannel]
]);
