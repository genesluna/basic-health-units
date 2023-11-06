FROM node:latest

WORKDIR /usr/src/app

COPY . .

COPY ./server/.env.production ./server/.env

WORKDIR /usr/src/app/server

RUN npm i --quiet --no-optional -no-fund --loglevel=error

RUN npm run build

WORKDIR /usr/src/app/client

RUN npm i --quiet -no-fund --loglevel=error

RUN npm run build

WORKDIR /usr/src/app/server

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]