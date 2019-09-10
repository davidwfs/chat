FROM node:alpine

RUN npm install -g pm2

EXPOSE 5000

WORKDIR /usr/app

ADD . .

RUN npm install
RUN npm run build
RUN cp -r src/public dist

CMD npm start
