FROM node:18

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["npm", "run", "start"]