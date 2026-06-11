FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG VITE_ENABLE_MOCKS=true
ENV VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS

RUN npm run build

FROM node:22-alpine AS run

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY vite.config.ts tsconfig.json tsconfig.app.json ./
COPY src/mocks ./src/mocks
COPY src/types ./src/types
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8080"]
