FROM node:8.10.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY lib .

EXPOSE 3000

CMD ["node", "main.js"]
