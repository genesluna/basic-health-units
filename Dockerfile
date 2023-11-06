FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY . .

COPY ./server/.env.production ./server/.env

WORKDIR /usr/src/app/client

RUN npm i --quiet -no-fund --loglevel=error

RUN npm run build

WORKDIR /usr/src/app/server

RUN npm i --quiet --no-optional -no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]