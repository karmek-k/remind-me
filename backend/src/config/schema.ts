import { BuildSchemaOptions } from 'type-graphql';
import WebhookConfigResolver from '../resolvers/WebhookConfigResolver';
import ReminderJobResolver from '../resolvers/ReminderJobResolver';
import ReminderResolver from '../resolvers/ReminderResolver';
import UserResolver from '../resolvers/UserResolver';
import { jwtAuthChecker } from './auth';

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [
    ReminderResolver,
    ReminderJobResolver,
    UserResolver,
    WebhookConfigResolver
  ],
  authChecker: jwtAuthChecker
};
