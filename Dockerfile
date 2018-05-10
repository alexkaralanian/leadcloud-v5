FROM node:9.10.0-alpine

LABEL maintainer="Alex Karalanian <alex.karalanian@gmail.com>" \
      version="1.0"

RUN mkdir /app

WORKDIR /app

RUN npm install -g nodemon
RUN npm install sequelize-cli -g

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install && mv node_modules /node_modules

COPY . .

EXPOSE 3001

CMD ["npm", "start"]

