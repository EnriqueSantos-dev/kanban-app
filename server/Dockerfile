FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/kanban/app

RUN groupadd --gid 1001 kanban-user && useradd --uid 1001 --gid 1001 -m kanban-user

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM node:22-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/kanban/app

RUN groupadd --gid 1001 kanban-user && useradd --uid 1001 --gid 1001 -m kanban-user

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=base /usr/kanban/app/node_modules ./node_modules
COPY --from=base /usr/kanban/app/package.json ./package.json
COPY --from=base /usr/kanban/app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --chown=kanban-user:kanban-user . .

RUN pnpm prisma generate

RUN pnpm build

RUN cp -r ./src/generated ./dist/generated

RUN pnpm prune --prod

FROM node:22-slim AS runner

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/kanban/app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN groupadd --gid 1001 kanban-user && useradd --uid 1001 --gid 1001 -m kanban-user

COPY --from=builder --chown=kanban-user:kanban-user /usr/kanban/app/dist ./dist
COPY --from=builder --chown=kanban-user:kanban-user /usr/kanban/app/node_modules ./node_modules
COPY --from=builder --chown=kanban-user:kanban-user /usr/kanban/app/package.json ./package.json
COPY --from=builder --chown=kanban-user:kanban-user /usr/kanban/app/prisma ./prisma
COPY --from=builder --chown=kanban-user:kanban-user /usr/kanban/app/start.sh ./start.sh

RUN chmod +x ./start.sh

USER kanban-user

EXPOSE 3333

CMD ["./start.sh", "node", "dist/main.js"]