FROM node:12.13-alpine As api-development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.13-alpine As api-production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=api-development /usr/src/app/dist ./dist

CMD node dist/main
