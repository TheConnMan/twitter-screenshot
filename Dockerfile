FROM node:slim

ENV TRACKING javascript

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y bzip2 libfreetype6 libfontconfig1
COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

CMD node streaming.js
