# build
FROM node:24.15.0-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN printf "VITE_BACKEND_API_BASE=MACHBARKEIT_BACKEND_API_BASE\nVITE_BASE_URL=MACHBARKEIT_BASE_URL" \
    > .env.production

RUN npm run build

# runner
FROM node:24.15.0-alpine AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY --link --from=builder /app/dist ./dist
COPY ./env.sh ./
RUN --mount=type=cache,target=/root/.npm npm install serve@^14.2.6 --omit=dev && \
    chown -R node:node dist/assets

USER node
EXPOSE 8080

ENTRYPOINT ["/app/env.sh"]
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
