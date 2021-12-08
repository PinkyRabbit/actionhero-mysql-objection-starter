FROM node:16 AS base
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
CMD ["npm", "run", "dev"]