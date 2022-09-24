FROM node:18.9.0-alpine3.16

WORKDIR /app

RUN mkdir ./data && chown node:node ./data

COPY package*.json ./

RUN npm install

COPY . .

ENV API_URL=https:www.example.com

EXPOSE 5000

USER node

CMD ["npm","run","dev"]