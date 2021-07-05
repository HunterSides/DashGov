FROM node

WORKDIR /app


COPY package*.json /app/


RUN npm install

COPY . /app/

EXPOSE 5000
EXPOSE 9998
CMD [ "npm", "start"]