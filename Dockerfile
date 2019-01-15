FROM node:10-alpine

RUN mkdir -p /app

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 5680

CMD npm start
