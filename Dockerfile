FROM node:20 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000
