FROM node

WORKDIR /usr/src/app

RUN cd api && npm install && run npm start && cd .. 
COPY . .

RUN cd client && npm install && run npm start && cd .. 
COPY . .


