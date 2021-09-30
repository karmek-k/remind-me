import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne
} from 'typeorm';
import { Reminder } from './Reminder';

@ObjectType({ description: 'Webhook definitions for a reminder.' })
@Entity()
export class WebhookConfig extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Reminder, { cascade: true })
  reminder!: Reminder;

  @Field({ nullable: true, description: 'Discord webhook' })
  @Column({ nullable: true })
  discord!: string;
}
