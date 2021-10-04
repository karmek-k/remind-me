import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apollo = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache()
});
