# Étape 1 : Construire l'application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Étape 2 : Utiliser un serveur Nginx pour héberger l'application
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /docker/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

