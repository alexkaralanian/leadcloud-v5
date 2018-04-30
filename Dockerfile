FROM node:9.10.0-alpine

LABEL maintainer="Alex Karalanian <alex.karalanian@gmail.com>" \
      version="1.0"

RUN mkdir /app

WORKDIR /app

RUN npm install -g nodemon
RUN npm install sequelize-cli -g
RUN npm install pm2 -g

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production && mv node_modules /node_modules

ENV NODE_ENV=production

COPY . .

EXPOSE 3001





