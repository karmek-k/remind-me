# compiling typescript
FROM node:16 AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build


# actually running the api
FROM node:16

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm ci --only=production

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
