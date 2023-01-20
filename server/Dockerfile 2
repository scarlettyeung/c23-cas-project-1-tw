FROM node:lts
WORKDIR /joasis
COPY . .
EXPOSE 8080
RUN yarn
CMD yarn prisma migrate reset --force && yarn ts-node main.ts
