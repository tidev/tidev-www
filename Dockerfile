FROM node:22-alpine

WORKDIR /app
COPY . /app

RUN apk add --no-cache openjdk8 && \
	npm i -g corepack@latest && \
	corepack enable && \
	pnpm install --frozen-lockfile && \
	pnpm run build

ENV NODE_ENV=production
EXPOSE 80/tcp
CMD [ "pnpm", "start" ]
