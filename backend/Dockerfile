# Stage 1: deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: final
FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./src/
COPY package.json ./

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
USER node

CMD ["node", "src/index.js"]
