FROM node

COPY . .

WORKDIR /usr/src/app

RUN cd api && npm install && run npm start && cd .. 
COPY . .
RUN cd ..

RUN cd client && npm install && run npm start && cd .. 
COPY . .
RUN cd .. 




