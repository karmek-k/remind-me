import { WebhookAddDto } from '../models/dtos/WebhookAddDto';
import { WebhookConfig } from '../models/WebhookConfig';
import { ChannelType } from '../services/channels/channelMap';

export async function dtosToWebhookConfig(
  dtos: WebhookAddDto[]
): Promise<WebhookConfig> {
  const result = new WebhookConfig();

  dtos.forEach(dto => {
    // TODO: make this more "automatic"
    switch (dto.channel) {
      case ChannelType.DISCORD:
        result.discord = dto.webhook;
        break;

      default:
        throw new Error(`Unknown channel type: ${dto.channel}`);
    }
  });

  return await result.save();
}
