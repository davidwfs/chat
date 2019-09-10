FROM node:alpine

RUN npm install -g pm2

EXPOSE 5000

WORKDIR /usr/app

COPY package.json package.json
COPY .babelrc .babelrc

RUN npm install
