FROM node:18-bullseye-slim as build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN npm i -g npm@latest; \
	npm i -g pnpm@latest; \
	pnpm install

COPY . .

RUN pnpm build

FROM node:18-bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g npm@latest; \
	npm i -g pnpm@latest;

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY . .

EXPOSE 3333

ENTRYPOINT [ "/bin/bash", "start.sh" ]
