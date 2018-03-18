FROM node:9.8.0-alpine

RUN mkdir /app

WORKDIR /app

RUN npm install -g nodemon

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production && mv node_modules /node_modules

COPY . .

LABEL maintainer="Alex Karalanian <alex.karalanian@gmail.com>" \
      version="1.0"

CMD node server
