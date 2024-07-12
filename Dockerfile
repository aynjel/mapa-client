# Stage 1 - Build distribution assets
FROM node:18.20.4-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i npm@latest -g
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Start nginx serve and serve distribution assets
FROM nginx:1.26-alpine as nginx
COPY --from=node /usr/src/app/dist /usr/share/nginx/html