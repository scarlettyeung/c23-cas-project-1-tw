FROM node:18-slim
WORKDIR /joasis
COPY . .
RUN yarn
RUN mkdir ./uplaods
CMD yarn prisma generate && yarn dotenv -e .env prisma migrate dev && yarn dotenv -e .env ts-node prisma/seed.ts && yarn dev
