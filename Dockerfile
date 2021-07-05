FROM node

WORKDIR /usr/src/app

COPY . .

CMD ["docker", "compose up"]
