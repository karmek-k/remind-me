# Remind Me

## Installation

### Preview

You can quickly set up the API with Docker and `docker-compose`.

```
docker-compose -f docker-compose.prod.yml up
```

Don't worry if the API throws errors about not being able to connect
to the database - it will restart and start working.

### Development

```
docker-compose -f docker-compose.dev.yml up
```

Note that this command won't start the API, it simply provisions PostgreSQL and Redis.

In order to run the API:

```
cd backend
npm run build
npm run dev
```

Actually you don't have to run `npm run build` as the `dev` script does it automatically,
but without it you may get a `file not found` error.

## Using the API

Because the frontend is not finished yet, please use a GraphQL API client like [Insomnia](https://insomnia.rest/).

As for now, the backend allows for API introspection in all environments, so there should be no problem with using it.
