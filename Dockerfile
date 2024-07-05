FROM node:20 AS base
WORKDIR /app

FROM base AS deps-stage
COPY package.json package-lock.json ./
COPY src ./src
RUN npm install
EXPOSE 5000

CMD [ "npm", "run", "dev" ]
