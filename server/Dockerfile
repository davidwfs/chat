FROM node:alpine

WORKDIR /usr/app
ENV port=5000
EXPOSE 5000

ADD ./package.json .
RUN npm install
RUN npm install -g pm2

ADD . .

RUN npm run build

CMD npm start
