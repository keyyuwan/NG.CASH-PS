FROM node:alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY .env ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]