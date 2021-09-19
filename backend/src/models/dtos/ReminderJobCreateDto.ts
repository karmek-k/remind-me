import { InputType, Field, ID } from 'type-graphql';
import { Min, Max, ArrayUnique } from 'class-validator';
import { ChannelType } from '../../services/channels/channelMap';

@InputType()
export class ReminderJobCreateDto {
  @Field(() => ID)
  @Min(1)
  reminderId!: number;

  @Field(() => [ChannelType])
  @ArrayUnique()
  channels!: ChannelType[];

  @Field()
  @Min(0)
  @Max(23)
  hour!: number;

  @Field()
  @Min(0)
  @Max(59)
  minute!: number;
}
