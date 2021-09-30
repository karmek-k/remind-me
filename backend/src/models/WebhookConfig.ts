import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType({ description: 'Webhook definitions for a reminder.' })
@Entity()
export class WebhookConfig extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ description: 'Discord webhook' })
  @Column({ nullable: true })
  discord!: string;
}
