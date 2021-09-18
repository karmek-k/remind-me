import { InputType, Field } from 'type-graphql';
import { ChannelType } from '../../services/channels/channelMap';
import { ArrayUnique, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class ReminderCreateDto {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(255)
  message!: string;

  @Field(() => [ChannelType])
  @ArrayUnique()
  channels!: Set<ChannelType>;

  @Field()
  @Min(0)
  @Max(23)
  hour!: number;

  @Field()
  @Min(0)
  @Max(59)
  minute!: number;
}
