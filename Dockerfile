FROM node:10.14.2-alpine

LABEL maintainer="Alex Karalanian <alex.karalanian@gmail.com>" \
      version="1.0"

RUN mkdir /app

WORKDIR /app

RUN npm i -g nodemon sequelize-cli pm2

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i && mv node_modules /node_modules

COPY . .

EXPOSE 3001

CMD ["sh", "start.sh"]

