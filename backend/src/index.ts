import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { loggerService } from './services/logger';
import { queueService } from './services/queue';
import { createConnection } from 'typeorm';
import { dbConfig } from './config/db';
import { jwtAuthContext } from './config/auth';
import { schemaConfig } from './config/schema';

async function init() {
  if (process.env.NODE_ENV === 'production') {
    loggerService.log('The server is running in production mode');
  }

  await createConnection(dbConfig);
  loggerService.log('Database connection established');

  const jobCount = await queueService.loadJobs();
  loggerService.log(`Job count: ${jobCount}`);

  const schema = await buildSchema(schemaConfig);
  const server = new ApolloServer({
    schema,
    context: jwtAuthContext
  });

  const port = process.env.PORT ?? 8000;
  const { url } = await server.listen(port);
  loggerService.log(`Server running on ${url}`);
}

init();
