FROM node

#WORKDIR /app
WORKDIR /usr/src/app

#COPY package*.json /app/
COPY ./package.json ./

RUN npm install

#COPY . /app/
COPY . .

EXPOSE 5000
EXPOSE 9998
CMD [ "npm", "start"]