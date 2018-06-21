FROM node:9

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install && npm install -g npx

RUN npx ng build

FROM nginx:stable

COPY --from=0 /app/build /usr/share/nginx/html
