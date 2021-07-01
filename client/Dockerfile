FROM node:13.12.0-alpine

WORKDIR /client

COPY package*.json /client/

RUN npm install

# copy project files and folders to the current working directory (i.e. 'client' folder)
COPY . /client/

# build client for production with minification
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
