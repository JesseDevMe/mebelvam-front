FROM node:18

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

ENV STRAPI_HOST 127.0.0.1
ENV STRAPI_PORT 1337
ENV STRAPI_URL http://$STRAPI_HOST:$STRAPI_PORT
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]