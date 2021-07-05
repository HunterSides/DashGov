FROM node:13.12.0-alpine

#WORKDIR /client
WORKDIR /usr/src/app

#COPY package*.json /client/
COPY ./package.json ./

RUN npm install

# copy project files and folders to the current working directory (i.e. 'client' folder)
#COPY . /client/
COPY . . 
# build client for production with minification
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
