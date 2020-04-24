FROM node:12.16.2-alpine3.9

WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

WORKDIR ./dist

EXPOSE ${SERVER_PORT}

CMD npm start